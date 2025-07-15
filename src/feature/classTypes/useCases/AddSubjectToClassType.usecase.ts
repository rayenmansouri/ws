import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ExamTypeRepo } from "../../examTypes/repos/examType.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { ClassTypeRepo } from "../repo/ClassType.repo";
import { TOPIC_TYPE_ENUM } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";

@injectable()
export class AddSubjectToClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo,
    @inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    data: {
      subjectTypeNewId: string;
      exams?: { examTypeNewId: string; coefficient: number }[];
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
      data.subjectTypeNewId,
      "notFound.subjectType",
    );

    const subjectOfClassTypeIds = classType.subjects.map(subject => subject.subjectType);

    const isSubjectAlreadyUsed = subjectOfClassTypeIds.includes(subjectType._id);

    if (isSubjectAlreadyUsed) throw new BadRequestError("classType.subjectTypeAlreadyUsed");

    const subjectToClassTypePayload = {
      subjectType: subjectType._id,
      coefficient: data.coefficient,
      subSubjects: [],
      exams: [],
    };

    if (!data.exams) {
      await this.classTypeRepo.addSubjectToClassType(classType._id, subjectToClassTypePayload);
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

    const classDocs = await this.classRepo.findManyByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );
    const termOfClassTypeIds = classType.subLevel.level.currentSchoolYear.terms.map(
      term => term._id,
    );
    const examTypesIds = examTypes.map(examType => examType._id);

    await this.examGradeRepo.addManyByClasses({
      topicId: subjectType._id,
      topicType: TOPIC_TYPE_ENUM.SUBJECT_TYPE,
      termsIds: termOfClassTypeIds,
      examTypesIds: examTypesIds,
      classDocs,
    });

    await this.gradeBookObservationRepo.addManyByClasses({
      topicId: subjectType._id,
      topicType: TOPIC_TYPE_ENUM.SUBJECT_TYPE,
      termsIds: termOfClassTypeIds,
      classDocs,
    });

    await this.classTypeRepo.addSubjectToClassType(classType._id, {
      ...subjectToClassTypePayload,
      exams,
    });

    await this.classRepo.addSubjectType(classType._id, subjectType._id);
  }
}
