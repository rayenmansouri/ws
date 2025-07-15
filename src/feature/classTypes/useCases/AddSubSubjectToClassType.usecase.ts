import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { ExamTypeRepo } from "../../examTypes/repos/examType.repo";
import { SubSubjectTypesRepo } from "../../subSubjectTypes/repos/SubSubjectTypes.repo";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";
import { ID } from "../../../types/BaseEntity";
import { TOPIC_TYPE_ENUM } from "../../examGrade/domain/tunisian/ExamGrade.entity";

@injectable()
export class AddSubSubjectToClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo,
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    subjectTypeNewId: string,
    data: {
      subSubjectTypeNewId: string;
      exams: { examTypeNewId: string; coefficient: number }[];
      coefficient: number;
    },
  ): Promise<void> {
    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subLevel"] },
    );

    const classAlreadyGenerated = await this.classRepo.findGeneratedTermByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    if (classAlreadyGenerated) throw new BadRequestError("class.alreadyGenerated");

    const subjectType = await this.subjectTypesRepo.findOneByNewIdOrThrow(
      subjectTypeNewId,
      "notFound.subjectType",
    );

    const subject = classType.subjects.find(subject => subject.subjectType === subjectType._id);

    if (!subject) throw new BadRequestError("classType.subjectTypeNotFound");

    const subSubjectType = await this.subSubjectTypeRepo.findOneByNewIdOrThrow(
      data.subSubjectTypeNewId,
      "notFound.subSubjectType",
    );

    const subSubjectIds = classType.subjects.flatMap(subject =>
      subject.subSubjects.map(subject => subject.subSubjectType),
    );

    const isSubSubjectAlreadyUsed = subSubjectIds.includes(subSubjectType._id);

    if (isSubSubjectAlreadyUsed) throw new BadRequestError("classType.subSubjectTypeAlreadyUsed");

    const subSubjectToClassTypeToAdd: (typeof classType.subjects)[0]["subSubjects"][0] = {
      subSubjectType: subSubjectType._id,
      coefficient: data.coefficient,
      exams: [],
    };

    if (data.exams.length === 0) {
      await this.classTypeRepo.addSubSubjectToClassType(
        classType._id,
        subject.subjectType,
        subSubjectToClassTypeToAdd,
      );
      return;
    }

    const examTypeNewIds = data.exams.map(exam => exam.examTypeNewId);
    const examTypes = await this.examTypeRepo.findManyByNewIdsOrThrow(
      examTypeNewIds,
      "notFound.examType",
    );

    const exams = data.exams.map(exam => {
      const examType = examTypes.find(examType => examType.newId === exam.examTypeNewId)!;
      return { examType: examType._id, coefficient: exam.coefficient };
    });

    const termIds = classType.subLevel.level.currentSchoolYear.terms.map(term => term._id);
    const examTypeIds = exams.map(exam => exam.examType);
    await this.addExamGradeAndGradeBookObservation({
      termsIds: termIds,
      classTypeId: classType._id,
      schoolYearId: classType.subLevel.level.currentSchoolYear._id,
      subSubjectTypeId: subSubjectType._id,
      examTypeIds,
    });

    await this.classTypeRepo.addSubSubjectToClassType(classType._id, subject.subjectType, {
      ...subSubjectToClassTypeToAdd,
      exams,
    });
  }

  private async addExamGradeAndGradeBookObservation(data: {
    termsIds: ID[];
    classTypeId: ID;
    schoolYearId: ID;
    subSubjectTypeId: ID;
    examTypeIds: ID[];
  }): Promise<void> {
    const { classTypeId, termsIds, schoolYearId, subSubjectTypeId, examTypeIds } = data;
    const classDocs = await this.classRepo.findManyByClassTypeInSchoolYear(
      classTypeId,
      schoolYearId,
    );

    await this.examGradeRepo.addManyByClasses({
      topicId: subSubjectTypeId,
      topicType: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
      examTypesIds: examTypeIds,
      classDocs,
      termsIds,
    });

    await this.gradeBookObservationRepo.addManyByClasses({
      topicId: subSubjectTypeId,
      topicType: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
      classDocs,
      termsIds,
    });
  }
}
