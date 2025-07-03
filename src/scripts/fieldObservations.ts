import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { GradeBookObservation } from "../feature/gradeBookObservation/gradeBookObservation.entity";
import { TOPIC_TYPE_ENUM } from "../feature/examGrade/domain/tunisian/ExamGrade.entity";
import { BaseEntity } from "../types/BaseEntity";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const schools = await schoolRepo.findAll();

  for (const school of schools) {
    console.log(`🚀 Working on ${school.name}`);
    const childContainer = container.createChild();
    const schoolConnection = await getNewTenantConnection(school.subdomain);
    childContainer.bind("Connection").toConstantValue(schoolConnection);

    const classTypeRepo = childContainer.get("ClassTypeRepo");
    const allClassTypes = await classTypeRepo.findAll({ populate: ["subLevel"] });

    const payloads: Omit<GradeBookObservation, keyof BaseEntity>[] = [];
    for (const classType of allClassTypes) {
      if (!classType.fields || classType.fields.length === 0) continue;

      const classRepo = childContainer.get("ClassRepo");
      const classes = await classRepo.findManyByClassType(classType._id);

      for (const classDoc of classes) {
        const initializeObject: Record<string, string | null> = classDoc.students.reduce(
          (acc, student) => {
            acc[student.toString()] = null;
            return acc;
          },
          {} as Record<string, string | null>,
        );

        for (const terms of classType.subLevel.level.currentSchoolYear.terms) {
          for (const field of classType.fields) {
            const payload = {
              topicId: field._id,
              topicType: TOPIC_TYPE_ENUM.FIELD,
              class: classDoc._id,
              term: terms._id,
              observations: initializeObject,
              ibInvestments: initializeObject,
            };

            payloads.push(payload);
          }
        }
      }
    }

    const gradeBookObservationRepo = childContainer.get("GradeBookObservationRepo");
    await gradeBookObservationRepo.addMany(payloads);
  }
};

dotenv.config();
const DB = masterDBUri;
mongoose.set("strictQuery", false);

mongoose
  .connect(DB)
  .then(async () => {
    container.bind("MasterConnection").toConstantValue(mongoose.connection);
    await scripts();
  })
  .catch(err => {
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
