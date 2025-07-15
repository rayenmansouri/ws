import { injectable } from "inversify";
import { difference } from "lodash";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { TOPIC_TYPE_ENUM } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { ExamTypeRepo } from "../../examTypes/repos/examType.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { ClassType } from "../repo/classType.entity";
import { SubSubjectType } from "../../subSubjectTypes/domains/subSubjectType.entity";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";

@injectable()
export class UpdateSubSubjectOfClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypesRepo: SubSubjectTypesRepo,
    @inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    subSubjectNewId: string,
    data: Partial<{
      coefficient: number;
      exams: { examTypeNewId: string; coefficient: number }[];
    }>,
  ): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subLevel"] },
    );
    const terms = classType.subLevel.level.currentSchoolYear.terms;
    const termIds = terms.map(term => term._id);

    const classGenerated = await this.classRepo.findGeneratedTermByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );
    if (classGenerated) throw new BadRequestError("class.alreadyGenerated");

    const subSubjectType = await this.subSubjectTypesRepo.findOneByNewIdOrThrow(
      subSubjectNewId,
      "notFound.subSubjectType",
    );
    const subject = classType.subjects.find(subject =>
      subject.subSubjects.find(subSubject => subSubject.subSubjectType === subSubjectType._id),
    );
    if (!subject) throw new BadRequestError("notFound.subject");
    const subSubject = subject.subSubjects.find(
      subSubject => subSubject.subSubjectType === subSubjectType._id,
    );
    if (!subSubject) throw new BadRequestError("notFound.subSubject");

    if (!data.exams) {
      if (data.coefficient != undefined)
        await this.updateSubjectCoefficient(classType, subSubjectType, data.coefficient);
      return;
    }

    const currentExamTypeIds = subSubject.exams.map(exam => exam.examType);
    const newExamTypeNewIds = data.exams.map(exam => exam.examTypeNewId);
    const newExamTypes = await this.examTypeRepo.findManyByNewIdsOrThrow(
      newExamTypeNewIds,
      "notFound.examType",
    );
    const newExamTypeIds = newExamTypes.map(examType => examType._id);
    const newExamTypeIdToBeAdded = difference(newExamTypeIds, currentExamTypeIds);

    const examTypeIdToBeRemoved = difference(currentExamTypeIds, newExamTypeIds);

    const newExamTypeToBeAdded = newExamTypes.filter(examType =>
      newExamTypeIdToBeAdded.includes(examType._id),
    );

    const classDocs = await this.classRepo.findManyByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    await this.examGradeRepo.deleteManyBySubSubject({
      subSubjectTypeId: subSubjectType._id,
      examTypeIds: examTypeIdToBeRemoved,
      classIds: classDocs.map(classDoc => classDoc._id),
    });

    await this.gradeBookObservationRepo.deleteManyByClassAndTopic(
      classDocs.map(classDoc => classDoc._id),
      subSubjectType._id,
      TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
    );

    await this.examGradeRepo.addManyByClasses({
      topicId: subSubjectType._id,
      topicType: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
      examTypesIds: newExamTypeIdToBeAdded,
      termsIds: termIds,
      classDocs,
    });

    await this.gradeBookObservationRepo.addManyByClasses({
      topicId: subSubjectType._id,
      topicType: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
      classDocs,
      termsIds: termIds,
    });

    const subjects = classType.subjects.map(subject => {
      const subSubjects = subject.subSubjects.map(subSubject => {
        if (subSubject.subSubjectType != subSubjectType._id) return subSubject;

        const oldExams = subSubject.exams
          .filter(exam => !examTypeIdToBeRemoved.includes(exam.examType))
          .map(oldExam => {
            const examType = newExamTypes.find(exam => exam._id === oldExam.examType);

            const coefficient = data.exams!.find(
              exam => exam.examTypeNewId === examType?.newId,
            )?.coefficient;
            return {
              examType: oldExam.examType,
              coefficient: coefficient ?? oldExam.coefficient,
            };
          });

        const newExam = newExamTypeToBeAdded.map(examType => ({
          examType: examType._id,
          coefficient: data.exams!.find(exam => exam.examTypeNewId === examType.newId)
            ?.coefficient!,
        }));

        return {
          ...subSubject,
          coefficient: data.coefficient ?? subSubject.coefficient,
          exams: oldExams.concat(newExam),
        };
      });
      return { ...subject, subSubjects, coefficient: data.coefficient ?? subject.coefficient };
    });

    await this.classTypeRepo.updateOneById(classType._id, {
      subjects,
    });
  }

  private async updateSubjectCoefficient(
    classType: Pick<ClassType, "subjects" | "_id">,
    subSubjectType: SubSubjectType,
    coefficient: number,
  ) {
    const subjects = classType.subjects.map(subject => {
      const subSubjects = subject.subSubjects.map(subSubject => {
        if (subSubject.subSubjectType === subSubjectType._id) {
          return { ...subSubject, coefficient };
        }
        return subSubject;
      });
      return { ...subject, subSubjects };
    });
    await this.classTypeRepo.updateOneById(classType._id, {
      subjects,
    });
  }
}
