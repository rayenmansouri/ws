/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/only-throw-error */
/* eslint-disable no-console */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { masterDBUri } from "../config";
import { container } from "../core/container/container";
import { initializeSubdomains, schoolDocStore } from "../core/subdomainStore";
import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { IClass } from "../database/schema/pedagogy/class/class.schema";
import { IClassType } from "../database/schema/pedagogy/class/classType.schema";
import { ISubLevel } from "../database/schema/pedagogy/structure/subLevel.schema";
import { populateInterface } from "../database/types";
import { ClassTypeService } from "../feature/classTypes/domains/ClassType.service";
import { isIdsEqual } from "../helpers/functionsUtils";
import { IEntity } from "../types/entities";
import { getScriptArgs } from "../helpers/getScriptArgs";
import { NotFoundError } from "../core/ApplicationErrors";
import { ExamGrade, TOPIC_TYPE_ENUM } from "../feature/examGrade/domain/tunisian/ExamGrade.entity";
import { ID } from "../types/BaseEntity";
import { GradeBookObservation } from "../feature/gradeBookObservation/gradeBookObservation.entity";
import { registerAllDependencies } from "../core/container/registerAllDependencies";

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const tenantsDocs = (await schoolRepo.findAll()).filter(tenant => tenant.subdomain === "oist");
  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getNewTenantConnection(schoolSubdomain);
    console.log("WORKING ON", schoolSubdomain);

    const gradeBookObservations = await connection
      .model<GradeBookObservation>("gradeBookObservation")
      .find({});
    const classes = (await connection
      .model("class")
      .find({})
      .populate({
        path: "classType",
        populate: { path: "subLevel" },
      })) as unknown as populateInterface<
      IClass,
      { classType: populateInterface<IClassType, { subLevel: ISubLevel }> }
    >[];
    const gradeBookObservationPayloads: Omit<GradeBookObservation, keyof IEntity>[] = [];

    for (const classDoc of classes) {
      const terms = classDoc.classType.subLevel.level.currentSchoolYear.terms;

      const updateQuery = {
        observations: {} as Record<string, string | null>,
      };
      classDoc.students.forEach(student => {
        updateQuery.observations[`${student.toString()}`] = null;
      });

      for (const term of terms) {
        for (const subject of classDoc.classType.subjects) {
          const isIncludeInGradeBook = ClassTypeService.checkSubjectIncludedInGradeBook(subject);
          if (!isIncludeInGradeBook) continue;
          const hasSubSubjects = subject.subSubjects.length > 0;
          if (hasSubSubjects) {
            for (const subSubject of subject.subSubjects) {
              const isIncludeInGradeBook =
                ClassTypeService.checkSubSubjectIncludedInGradeBook(subSubject);
              if (isIncludeInGradeBook) continue;

              const gradeBookObservation: Omit<GradeBookObservation, keyof IEntity> = {
                topicType: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
                topicId: subSubject.subSubjectType.toString() as ID,
                term: term._id.toString() as ID,
                observations: updateQuery.observations,
                class: classDoc._id.toString() as ID,
                ibInvestments: {},
              };

              const isGradeBookObservationAlreadyExist = gradeBookObservations.find(examGrade => {
                return (
                  isIdsEqual(examGrade.topicId, gradeBookObservation.topicId) &&
                  isIdsEqual(examGrade.class, gradeBookObservation.class) &&
                  isIdsEqual(examGrade.term, gradeBookObservation.term) &&
                  examGrade.topicType === gradeBookObservation.topicType
                );
              });

              if (isGradeBookObservationAlreadyExist) continue;

              gradeBookObservationPayloads.push(gradeBookObservation);
            }
          } else {
            const gradeBookObservationPayload: Omit<GradeBookObservation, keyof IEntity> = {
              topicType: TOPIC_TYPE_ENUM.SUBJECT_TYPE,
              topicId: subject.subjectType.toString() as ID,
              term: term._id.toString() as ID,
              observations: updateQuery.observations,
              class: classDoc._id.toString() as ID,
              ibInvestments: {},
            };

            const isGradeBookObservationAlreadyExist = gradeBookObservations.find(examGrade => {
              return (
                isIdsEqual(examGrade.topicId, gradeBookObservationPayload.topicId) &&
                isIdsEqual(examGrade.class, gradeBookObservationPayload.class) &&
                isIdsEqual(examGrade.term, gradeBookObservationPayload.term) &&
                examGrade.topicType === gradeBookObservationPayload.topicType
              );
            });

            if (isGradeBookObservationAlreadyExist) continue;

            gradeBookObservationPayloads.push(gradeBookObservationPayload);
          }
        }
      }
    }

    console.log("Found ", gradeBookObservationPayloads.length, " examGrade to add");

    const isInsertGradeBookObservationEnabled = getScriptArgs()[0] === "insertGradeBookObservation";
    console.log(
      "🚀 ~ scripts ~ isInsertGradeBookObservationEnabled:",
      isInsertGradeBookObservationEnabled,
    );
    if (isInsertGradeBookObservationEnabled) {
      await connection.model<ExamGrade>("examGrade").insertMany(gradeBookObservationPayloads);
    }
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
    console.log(err);

    console.log("Master db connection error ⛔️");
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
