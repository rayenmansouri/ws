import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { ClassType } from "../feature/classTypes/repo/classType.entity";
import { Teacher } from "../feature/teachers/domain/teacher.entity";
import { School } from "../feature/schools/domain/school.entity";
import { SubjectType } from "../feature/subjectTypes/domains/subjectType.entity";
import { SubSubjectType } from "../feature/subSubjectTypes/domains/subSubjectType.entity";
import { Class } from "../feature/classes/domain/class.entity";
import logger from "../core/Logger";
import { Classroom } from "../feature/classrooms/domains/classroom.entity";
import { registerAllDependencies } from "../core/container/registerAllDependencies";

export const scripts = async (): Promise<void> => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  const schoolModel = container.get("MasterConnection").model<School>("schools");
  await schoolModel.updateMany({}, { $set: { notAvailableTimes: [], "schedule.step": 1 } });

  for (const school of schools) {
    const childContainer = container.createChild();
    const schoolConnection = await getNewTenantConnection(school.subdomain);
    logger.info(`Working on ${school.subdomain}`);
    childContainer.bind("Connection").toConstantValue(schoolConnection);

    const classTypeModel = schoolConnection.model<ClassType>("classType");
    await classTypeModel.updateMany({}, { $set: { activities: [] } });

    const teacherModel = schoolConnection.model<Teacher>("teacher");
    await teacherModel.updateMany(
      {},
      {
        $set: {
          notAvailableTimes: [],
          maxDaysPerWeek: null,
          maxGapsPerDay: null,
          maxHoursPerDay: null,
          preferredClassroom: null,
        },
      },
    );

    const subjectTypeModel = schoolConnection.model<SubjectType>("subjectType");
    await subjectTypeModel.updateMany({}, { $set: { preferredStartingHours: [] } });

    const subSubjectTypeModel = schoolConnection.model<SubSubjectType>("subSubjectType");
    await subSubjectTypeModel.updateMany({}, { $set: { preferredStartingHours: [] } });

    const classModel = schoolConnection.model<Class>("class");
    await classModel.updateMany(
      {},
      {
        $set: {
          notAvailableTimes: [],
          maxHoursPerDay: null,
          maxContinuousHours: null,
          preferredClassroom: null,
          maxGapsPerDay: null,
        },
      },
    );

    const classroomModel = schoolConnection.model<Classroom>("classroom");
    await classroomModel.updateMany(
      {},
      {
        $set: {
          allowAllSubjects: true,
          allowAllSessionTypes: true,
          subjectTypes: [],
          sessionTypes: [],
        },
      },
    );
  }
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    registerAllDependencies();
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await scripts();
  })
  .catch(err => {
    logger.error(err);

    logger.error("Master db connection error ⛔️");
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
