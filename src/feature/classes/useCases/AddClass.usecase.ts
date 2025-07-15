import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { Class } from "../domain/class.entity";
import { ClassRepo } from "../domain/Class.repo";
import { AssignTeachersToSubjectsInClassUseCase } from "./AssignTeacherToSubjectInClass.usecase";
import { AssignTeacherToSubSubjectInClassUseCase } from "./AssignTeacherToSubSubjectInClass.usecase";
import { AssignStudentToClassUseCase } from "./AssignStudentToClass.usecase";
import { ClassGroupRepo } from "../domain/classGroup.repo";
import { ClassMapper } from "../mappers/Classes.mapper";
import { ClassDTO } from "../dto/Classes.dto";
import { ExamGrade, TOPIC_TYPE_ENUM } from "../../examGrade/domain/tunisian/ExamGrade.entity";
import { ExamGradeRepo } from "../../examGrade/domain/tunisian/ExamGrade.repo";
import { GradeBookObservationRepo } from "../../gradeBookObservation/GradeBookObservation.repo";
import { GradeBookObservation } from "../../gradeBookObservation/gradeBookObservation.entity";

type teacherId = ID;
type subjectTypeId = ID;

type AddClassUseCasePrams = {
  classTypeNewId: string;
  name: string;
  studentIds: ID[];
  subjectTeacherRecords: Record<subjectTypeId, teacherId>;
  subSubjectTeacherRecords: Record<subjectTypeId, teacherId>;
};

@injectable()
export class AddClassUseCase {
  constructor(
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
    @inject("AssignTeachersToSubjectsInClassUseCase")
    private assignTeachersToSubjectsInClassUseCase: AssignTeachersToSubjectsInClassUseCase,
    @inject("AssignTeacherToSubSubjectInClassUseCase")
    private assignTeacherToSubSubjectInClassUseCase: AssignTeacherToSubSubjectInClassUseCase,
    @inject("AssignStudentToClassUseCase")
    private assignStudentToClassUseCase: AssignStudentToClassUseCase,
  ) {}

  async execute(data: AddClassUseCasePrams): Promise<ClassDTO> {
    const { classTypeNewId } = data;

    const classType = await this.classTypeRepo.findOneByNewIdOrThrow(
      classTypeNewId,
      "notFound.classType",
      { populate: ["subLevel"] },
    );

    const currentSchoolYearId = classType.subLevel.level.currentSchoolYear._id;

    await this.classRepo.ensureNameIsUniqueInSchoolYear(data.name, currentSchoolYearId);

    const payload: Omit<Class, keyof BaseEntity> = {
      name: data.name,
      classType: classType._id,
      schoolYear: currentSchoolYearId,
      students: [],
      subjectTeacherMap: {},
      subSubjectTeacherMap: {},
      classGroups: [],
      notAvailableTimes: [],
      maxHoursPerDay: null,
      maxGapsPerDay: null,
      maxContinuousHours: null,
      preferredClassroom: null,
      gradeReports: [],
    };

    const classDoc = await this.classRepo.addOne(payload);

    const group1 = await this.classGroupRepo.addOne({
      name: "Group 1",
      class: classDoc._id,
      students: [],
    });

    const group2 = await this.classGroupRepo.addOne({
      name: "Group 2",
      class: classDoc._id,
      students: [],
    });

    await this.classRepo.updateOneById(classDoc._id, { classGroups: [group1._id, group2._id] });

    await this.assignTeachersToSubjectsInClassUseCase.execute({
      classNewId: classDoc.newId,
      teacherSubjectMappings: Object.entries(data.subjectTeacherRecords).map(
        ([subjectTypeId, teacherId]) => ({
          subjectTypeId: subjectTypeId as ID,
          teacherId,
        }),
      ),
    });

    await this.assignTeacherToSubSubjectInClassUseCase.execute({
      classNewId: classDoc.newId,
      teacherSubSubjectMappings: Object.entries(data.subSubjectTeacherRecords).map(
        ([subSubjectTypeId, teacherId]) => ({
          subSubjectTypeId: subSubjectTypeId as ID,
          teacherId,
        }),
      ),
    });

    const terms = classType.subLevel.level.currentSchoolYear.terms;

    const subjects = classType.subjects.map(subject => ({
      subjectTypeId: subject.subjectType,
      subSubjects: subject.subSubjects.map(subSubject => ({
        subSubjectTypeId: subSubject.subSubjectType,
        examTypeIds: subSubject.exams.map(exam => exam.examType),
      })),
      examTypeIds: subject.exams.map(exam => exam.examType),
    }));

    const examPayload: Omit<ExamGrade, keyof BaseEntity>[] = terms.flatMap(term =>
      subjects.flatMap(subject => {
        const examSubSubject: Omit<ExamGrade, keyof BaseEntity>[] = subject.subSubjects.flatMap(
          subSubject => {
            return subSubject.examTypeIds.map(examTypeId => ({
              examType: examTypeId,
              topicId: subSubject.subSubjectTypeId,
              topicType: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
              term: term._id,
              degrees: {},
              class: classDoc._id,
            }));
          },
        );

        const examSubject: Omit<ExamGrade, keyof BaseEntity>[] = subject.examTypeIds.map(
          examTypeId => ({
            examType: examTypeId,
            topicId: subject.subjectTypeId,
            topicType: TOPIC_TYPE_ENUM.SUBJECT_TYPE,
            term: term._id,
            class: classDoc._id,
            degrees: {},
            examTypes: subject.examTypeIds,
          }),
        );
        return [...examSubSubject, ...examSubject];
      }),
    );

    const gradeBookObservationPayload: Omit<GradeBookObservation, keyof BaseEntity>[] =
      terms.flatMap(term =>
        subjects.flatMap(subject => {
          const subSubjectObservation: Omit<GradeBookObservation, keyof BaseEntity>[] =
            subject.subSubjects.flatMap(subSubject => {
              return {
                topicId: subSubject.subSubjectTypeId,
                topicType: TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE,
                term: term._id,
                observations: {},
                ibInvestments: {},
                class: classDoc._id,
              };
            });

          const subjectObservation: Omit<GradeBookObservation, keyof BaseEntity> = {
            topicId: subject.subjectTypeId,
            topicType: TOPIC_TYPE_ENUM.SUBJECT_TYPE,
            term: term._id,
            class: classDoc._id,
            observations: {},
            ibInvestments: {},
          };

          return [...subSubjectObservation, subjectObservation];
        }),
      );

    terms.forEach(term => {
      gradeBookObservationPayload.push({
        topicId: null,
        topicType: null,
        term: term._id,
        class: classDoc._id,
        observations: {},
        ibInvestments: {},
      });
    });

    await this.examGradeRepo.addMany(examPayload);
    await this.gradeBookObservationRepo.addMany(gradeBookObservationPayload);

    await this.assignStudentToClassUseCase.execute({
      classNewId: classDoc.newId,
      studentIds: data.studentIds,
    });

    return ClassMapper.toClassDto(classDoc);
  }
}
