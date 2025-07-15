import { injectable } from "inversify";
import { inject } from "../../../../../core/container/TypedContainer";
import { ID } from "../../../../../types/BaseEntity";
import { ClassRepo } from "../../../../classes/domain/Class.repo";
import { ClassTypeRepo } from "../../../../classTypes/repo/ClassType.repo";
import { ExamTypeRepo } from "../../../../examTypes/repos/examType.repo";
import { ExamGradeRepo } from "../ExamGrade.repo";
import { ExamGrades } from "../ExamGrades.entity";
import { Grade } from "../Grade.valueobject";
import { GradingEntity } from "../Grading.entity";
import { TeacherRepo } from "../../../../teachers/domain/Teacher.repo";
import { UserMapper } from "../../../../users/mappers/User.mapper";
import { GradeBookObservationRepo } from "../../../../gradeBookObservation/GradeBookObservation.repo";
import { TermRepo } from "../../../../terms/repos/Term.repo";
import { PrimaryTermClassGrades } from "./PrimaryTermClassGrades.entity";
import { PrimaryAnnualClassGrades } from "./PrimaryAnnualClassGrades.entity";
import { GradeReportTemplateRepo } from "../../../../gradeReportTemplate/domain/GradeReportTemplate.repo";
import { GradeReportTemplate } from "../../../../gradeReportTemplate/domain/gradeReportTemplate.entity";

@injectable()
export class PrimaryClassGradesRepo {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("GradeReportTemplateRepo") private gradeReportTemplateRepo: GradeReportTemplateRepo,
  ) {}

  async loadTermClassGrades(
    classId: ID,
    termId: ID,
    gradeReportTemplateId?: ID,
  ): Promise<PrimaryTermClassGrades> {
    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "global.internalError");
    const termDoc = await this.termRepo.findOneByIdOrThrow(termId, "global.internalError");

    const classType = await this.classTypeRepo.findOneByIdOrThrow(
      classDoc.classType,
      "global.internalError",
      { populate: ["subjects.subjectType", "subjects.subSubjects.subSubjectType"] },
    );

    const teacherIds = [
      ...Object.values(classDoc.subSubjectTeacherMap),
      ...Object.values(classDoc.subjectTeacherMap),
    ].filter(value => value !== null);
    const allTeachers = await this.teacherRepo.findManyByIds(teacherIds);

    const allExamTypes = await this.examTypeRepo.findAll();

    const allGradeBookObservations = await this.gradeBookObservationRepo.findAllByTerm({
      classIds: [classId],
      termId,
    });

    const allExamGrades = await this.examGradeRepo.findAllExamGradesByTerm({
      classIds: [classId],
      termId,
    });

    let gradeReportTemplate: GradeReportTemplate;
    if (gradeReportTemplateId) {
      gradeReportTemplate = await this.gradeReportTemplateRepo.findOneByIdOrThrow(
        gradeReportTemplateId,
        "notFound.gradeReportTemplate",
      );
    } else {
      gradeReportTemplate = await this.gradeReportTemplateRepo.findDefaultTemplate(classType._id);
    }

    const fields: GradingEntity[] = [];

    for (const field of classType.fields) {
      const fieldSubjects = classType.subjects.filter(subject =>
        field.subjects.includes(subject.subjectType._id),
      );

      const subjectGrades: GradingEntity[] = [];
      for (const subject of fieldSubjects) {
        if (
          !gradeReportTemplate.isBuiltIn &&
          !gradeReportTemplate.subjectTypes.includes(subject.subjectType._id)
        )
          continue;

        if (subject.subSubjects.length > 0) {
          const subSubjectGrades: GradingEntity[] = [];
          for (const subSubject of subject.subSubjects) {
            if (subSubject.exams.length === 0) continue;

            const subSubjectExamGrades = subSubject.exams.map(exam => {
              const examType = allExamTypes.find(examType => examType._id === exam.examType)!;
              const examGrade = allExamGrades.find(
                examGrade =>
                  examGrade.topicId === subSubject.subSubjectType._id &&
                  examGrade.examType === exam.examType,
              )!;

              return new ExamGrades({
                examType: examType.name,
                examTypeRank: examType.rank,
                coefficient: exam.coefficient,
                examGradeId: examGrade._id,
                studentGrades: Object.entries(examGrade.degrees).map(([studentId, degree]) => ({
                  studentId: studentId as ID,
                  grade: Grade.create(exam.coefficient, degree),
                })),
              });
            });

            const subSubjectTeacher = allTeachers.find(
              teacher =>
                teacher._id === classDoc.subSubjectTeacherMap[subSubject.subSubjectType._id],
            );

            subSubjectGrades.push(
              new GradingEntity({
                name: subSubject.subSubjectType.name,
                newId: subSubject.subSubjectType.newId,
                coefficient: subSubject.coefficient,
                studentIds: classDoc.students,
                examGrades: subSubjectExamGrades,
                subTopics: [],
                teacher: subSubjectTeacher ? UserMapper.toUserProfileDTO(subSubjectTeacher) : null,
                teacherObservations: [],
                gradeBookObservationId: null,
              }),
            );
          }

          const subjectTeacher = allTeachers.find(
            teacher => teacher._id === classDoc.subjectTeacherMap[subject.subjectType._id],
          );

          subjectGrades.push(
            new GradingEntity({
              name: subject.subjectType.name,
              newId: subject.subjectType.newId,
              coefficient: subject.coefficient,
              studentIds: classDoc.students,
              examGrades: [],
              subTopics: subSubjectGrades,
              teacher: subjectTeacher ? UserMapper.toUserProfileDTO(subjectTeacher) : null,
              teacherObservations: [],
              gradeBookObservationId: null,
            }),
          );
          continue;
        }

        if (subject.exams.length === 0) continue;

        const subjectExamGrades = subject.exams.map(exam => {
          const examType = allExamTypes.find(examType => examType._id === exam.examType)!;
          const examGrade = allExamGrades.find(
            examGrade =>
              examGrade.topicId === subject.subjectType._id && examGrade.examType === exam.examType,
          )!;

          return new ExamGrades({
            examType: examType.name,
            examTypeRank: examType.rank,
            coefficient: exam.coefficient,
            examGradeId: examGrade._id,
            studentGrades: Object.entries(examGrade.degrees).map(([studentId, degree]) => ({
              studentId: studentId as ID,
              grade: Grade.create(exam.coefficient, degree),
            })),
          });
        });

        const subjectTeacher = allTeachers.find(
          teacher => teacher._id === classDoc.subjectTeacherMap[subject.subjectType._id],
        );

        subjectGrades.push(
          new GradingEntity({
            name: subject.subjectType.name,
            newId: subject.subjectType.newId,
            coefficient: subject.coefficient,
            studentIds: classDoc.students,
            examGrades: subjectExamGrades,
            subTopics: [],
            teacher: subjectTeacher ? UserMapper.toUserProfileDTO(subjectTeacher) : null,
            teacherObservations: [],
            gradeBookObservationId: null,
          }),
        );
      }

      if (subjectGrades.length === 0) continue;

      const fieldGradeBookObservation = allGradeBookObservations.find(
        observation => observation.topicId === field._id,
      )!;

      fields.push(
        new GradingEntity({
          name: field.name,
          newId: "",
          coefficient: field.coefficient,
          studentIds: classDoc.students,
          examGrades: [],
          subTopics: subjectGrades,
          teacher: null,
          teacherObservations: Object.entries(fieldGradeBookObservation.observations).map(
            ([studentId, observation]) => ({
              studentId: studentId as ID,
              observation: observation ?? null,
            }),
          ),
          gradeBookObservationId: fieldGradeBookObservation._id,
        }),
      );
    }

    const classGrades = new PrimaryTermClassGrades({
      gradeReportTemplateName: gradeReportTemplate?.name ?? null,
      classDoc: {
        _id: classDoc._id,
        newId: classDoc.newId,
        name: classDoc.name,
      },
      term: {
        _id: termDoc._id,
        newId: termDoc.newId,
        name: termDoc.name,
        coefficient: termDoc.coefficient,
      },
      fields,
      studentIds: classDoc.students,
    });

    return classGrades;
  }

  async loadAnnualClassGrades(
    classId: ID,
    termIds: ID[],
    templateId?: ID,
  ): Promise<PrimaryAnnualClassGrades> {
    const termClassGrades = await Promise.all(
      termIds.map(termId => this.loadTermClassGrades(classId, termId, templateId)),
    );

    return new PrimaryAnnualClassGrades(termClassGrades);
  }
}
