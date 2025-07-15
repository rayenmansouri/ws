import { injectable } from "inversify";
import { BadRequestError, InternalError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { TOPIC_TYPE_ENUM } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { ExamTypeRepo } from "../../examTypes/repos/examType.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { ClassTypeService } from "../domains/ClassType.service";
import { ClassTypeRepo } from "../repo/ClassType.repo";

@injectable()
export class UpdateSubjectFromClassTypeUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo,
    @inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo,
  ) {}

  async execute(
    classTypeNewId: string,
    subjectNewId: string,
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

    const subjectType = await this.subjectTypesRepo.findOneByNewIdOrThrow(
      subjectNewId,
      "notFound.subjectType",
    );

    const classGenerated = await this.classRepo.findGeneratedTermByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    if (classGenerated) throw new BadRequestError("class.alreadyGenerated");

    const subject = classType.subjects.find(subject => subject.subjectType === subjectType._id);

    if (!subject) throw new BadRequestError("notFound.subject");

    const classDocs = await this.classRepo.findManyByClassTypeInSchoolYear(
      classType._id,
      classType.subLevel.level.currentSchoolYear._id,
    );

    const classIds = classDocs.map(classDoc => classDoc._id);

    const terms = classType.subLevel.level.currentSchoolYear.terms;
    const termIds = terms.map(term => term._id);
    let exams = subject.exams;

    if (data.exams) {
      const newExamTypes = await this.examTypeRepo.findManyByNewIdsOrThrow(
        data.exams.map(exam => exam.examTypeNewId),
        "notFound.examType",
      );
      const examTypeIds = newExamTypes.map(exam => exam._id);
      const examTypeToBeRemovedIds = ClassTypeService.identifyRemovedExamTypeIds(
        subject.exams,
        examTypeIds,
      );

      await this.examGradeRepo.deleteManyBySubject({
        classIds,
        subjectTypeId: subjectType._id,
        examTypeIds: examTypeToBeRemovedIds,
      });

      const examTypeToBeAdded = ClassTypeService.identifyAddedExamTypes(
        subject.exams,
        newExamTypes,
      );

      const examTypeToBeAddedIds = examTypeToBeAdded.map(exam => exam._id);
      await this.examGradeRepo.addManyByClasses({
        topicId: subjectType._id,
        topicType: TOPIC_TYPE_ENUM.SUBJECT_TYPE,
        examTypesIds: examTypeToBeAddedIds,
        classDocs,
        termsIds: termIds,
      });

      exams = data.exams.map(exam => {
        const examType = newExamTypes.find(examType => examType.newId === exam.examTypeNewId);
        if (!examType) throw new InternalError("examType notFound");
        return { examType: examType._id, coefficient: exam.coefficient };
      });
    }

    const updateSubject = classType.subjects.map(subject => {
      if (subject.subjectType != subjectType._id) return subject;
      return {
        ...subject,
        coefficient: data.coefficient ?? subject.coefficient,
        exams: exams,
      };
    });

    await this.classTypeRepo.updateOneById(classType._id, { subjects: updateSubject });
  }
}
