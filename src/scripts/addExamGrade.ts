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

export const scripts = async () => {
  const schoolRepo = container.get("SchoolRepo");
  const tenantsDocs = (await schoolRepo.findAll()).filter(tenant => tenant.subdomain === "oist");
  if (tenantsDocs.length === 0) throw new NotFoundError("tenant not found");
  await initializeSubdomains();
  for (const tenantDoc of tenantsDocs) {
    const schoolSubdomain = schoolDocStore[tenantDoc._id.toString()].subdomain;
    const connection = await getNewTenantConnection(schoolSubdomain);
    console.log("WORKING ON", schoolSubdomain);

    const examGrades = await connection.model<ExamGrade>("examGrade").find({});
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
    const examGradePayloads: Omit<ExamGrade, keyof IEntity>[] = [];

    for (const classDoc of classes) {
      const terms = classDoc.classType.subLevel.level.currentSchoolYear.terms;

      const updateQuery = {
        degrees: {} as Record<string, number | null>,
      };
      classDoc.students.forEach(student => {
        updateQuery.degrees[`${student.toString()}`] = null;
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

              for (const examType of subSubject.exams) {
                const examGradePayload = {
                  topicType: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
                  topicId: subSubject.subSubjectType.toString() as ID,
                  term: term._id.toString() as ID,
                  examType: examType.examType.toString() as ID,
                  degrees: updateQuery.degrees,
                  class: classDoc._id.toString() as ID,
                };

                const isExamGradeAlreadyExist = examGrades.find(examGrade => {
                  return (
                    isIdsEqual(examGrade.topicId, examGradePayload.topicId) &&
                    isIdsEqual(examGrade.class, examGradePayload.class) &&
                    isIdsEqual(examGrade.examType, examGradePayload.examType) &&
                    isIdsEqual(examGrade.term, examGradePayload.term) &&
                    examGrade.topicType === examGradePayload.topicType
                  );
                });

                if (isExamGradeAlreadyExist) continue;

                examGradePayloads.push(examGradePayload);
              }
            }
          } else {
            for (const examType of subject.exams) {
              const examGradePayload = {
                topicType: TOPIC_TYPE_ENUM.SUBJECT_TYPE,
                topicId: subject.subjectType.toString() as ID,
                term: term._id.toString() as ID,
                examType: examType.examType.toString() as ID,
                degrees: updateQuery.degrees,
                class: classDoc._id.toString() as ID,
              };

              const isExamGradeAlreadyExist = examGrades.find(examGrade => {
                return (
                  isIdsEqual(examGrade.topicId, examGradePayload.topicId) &&
                  isIdsEqual(examGrade.class, examGradePayload.class) &&
                  isIdsEqual(examGrade.examType, examGradePayload.examType) &&
                  isIdsEqual(examGrade.term, examGradePayload.term) &&
                  examGrade.topicType === examGradePayload.topicType
                );
              });

              if (isExamGradeAlreadyExist) continue;

              examGradePayloads.push(examGradePayload);
            }
          }
        }
      }
    }

    console.log("Found ", examGradePayloads.length, " examGrade to add");

    const isInsertGradeEnabled = getScriptArgs()[0] === "insertExamGrade";
    if (isInsertGradeEnabled) {
      await connection.model<ExamGrade>("examGrade").insertMany(examGradePayloads);
    }
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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
