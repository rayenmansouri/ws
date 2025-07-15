import { injectable } from "inversify";
import { inject } from "../../../../../core/container/TypedContainer";
import { ID } from "../../../../../types/BaseEntity";
import { ClassRepo } from "../../../../classes/domain/Class.repo";
import { ClassTypeRepo } from "../../../../classTypes/repo/ClassType.repo";
import { ExamTypeRepo } from "../../../../examTypes/repos/examType.repo";
import { GradeBookObservationRepo } from "../../../../gradeBookObservation/GradeBookObservation.repo";
import { StudentProfileRepo } from "../../../../students/domain/StudentProfile.repo";
import { TeacherRepo } from "../../../../teachers/domain/Teacher.repo";
import { TermRepo } from "../../../../terms/repos/Term.repo";
import { UserMapper } from "../../../../users/mappers/User.mapper";
import { ExamGradeRepo } from "../ExamGrade.repo";
import { ExamGrades } from "../ExamGrades.entity";
import { Grade } from "../Grade.valueobject";
import { GradingEntity } from "../Grading.entity";
import { SecondaryAnnualClassGrades } from "./SecondaryAnnualClassGrades.entity";
import { SecondaryTermClassGrades } from "./SecondaryTermClassGrades.entity";
import { GroupRepo } from "../../../../groupManagement/repos/Group.repo";
import { GroupService } from "../../../../groupManagement/domains/Group.service";

@injectable()
export class SecondaryClassGradesRepo {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("ExamGradeRepo") private examGradeRepo: ExamGradeRepo,
    @inject("ExamTypeRepo") private examTypeRepo: ExamTypeRepo,
    @inject("TeacherRepo") private teacherRepo: TeacherRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("GradeBookObservationRepo") private gradeBookObservationRepo: GradeBookObservationRepo,
    @inject("TermRepo") private termRepo: TermRepo,
  ) {}

  async loadTermClassGrades(classId: ID, termId: ID): Promise<SecondaryTermClassGrades> {
    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "global.internalError");
    const termDoc = await this.termRepo.findOneByIdOrThrow(termId, "global.internalError");

    const studentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYear(
      classDoc.students,
      classDoc.schoolYear,
    );
    const groupsIds = Array.from(
      new Set<ID>(
        studentProfiles
          .flatMap(studentProfile => studentProfile.groups)
          .filter(value => value !== null),
      ),
    );
    const groups = await this.groupRepo.findManyByIdsForGrades(groupsIds);

    const teacherIds = [
      ...Object.values(classDoc.subjectTeacherMap),
      ...Object.values(classDoc.subSubjectTeacherMap),
      ...groups.map(group => group.teacher),
    ].filter(value => value !== null);
    const teachers = await this.teacherRepo.findManyByIds(teacherIds);

    const classType = await this.classTypeRepo.findOneByIdOrThrow(
      classDoc.classType,
      "global.internalError",
      { populate: ["subjects.subjectType", "subjects.subSubjects.subSubjectType"] },
    );

    const allExamTypes = await this.examTypeRepo.findAll();

    const allExamGrades = await this.examGradeRepo.findAllExamGradesByTerm({
      classIds: [classId],
      groupIds: groupsIds,
      termId,
    });

    const allGradeBookObservations = await this.gradeBookObservationRepo.findAllByTerm({
      classIds: [classId],
      groupIds: groupsIds,
      termId,
    });

    const subjects: GradingEntity[] = [];

    for (const subject of classType.subjects) {
      if (subject.subSubjects.length > 0) {
        const subSubjects: GradingEntity[] = [];

        for (const subSubject of subject.subSubjects) {
          if (subSubject.exams.length === 0) continue;

          const subSubjectExamGrades = allExamGrades.filter(
            examGrade => examGrade.topicId === subSubject.subSubjectType._id,
          );

          const subSubjectGrades = subSubjectExamGrades.map(examGrade => {
            const examType = allExamTypes.find(examType => examType._id === examGrade.examType)!;
            const examCoefficient = subSubject.exams.find(exam => exam.examType === examType._id)
              ?.coefficient as number;

            return new ExamGrades({
              examType: examType.name,
              examTypeRank: examType.rank,
              coefficient: examCoefficient,
              examGradeId: examGrade._id,
              studentGrades: Object.entries(examGrade.degrees).map(([studentId, degree]) => {
                return {
                  studentId: studentId as ID,
                  grade: Grade.create(examCoefficient, degree),
                };
              }),
            });
          });

          const teacher =
            teachers.find(
              teacher =>
                teacher._id === classDoc.subSubjectTeacherMap[subSubject.subSubjectType._id],
            ) ?? null;

          const subSubjectTeacherObservations = allGradeBookObservations.find(
            gradeBookObservation => gradeBookObservation.topicId === subSubject.subSubjectType._id,
          )!;

          subSubjects.push(
            new GradingEntity({
              name: subSubject.subSubjectType.name,
              newId: subSubject.subSubjectType.newId,
              coefficient: subSubject.coefficient,
              studentIds: classDoc.students,
              examGrades: subSubjectGrades,
              subTopics: [],
              teacher: teacher ? UserMapper.toUserProfileDTO(teacher) : null,
              teacherObservations: Object.entries(subSubjectTeacherObservations.observations).map(
                ([studentId, observation]) => ({
                  studentId: studentId as ID,
                  observation: observation ?? null,
                }),
              ),
              gradeBookObservationId: subSubjectTeacherObservations._id,
            }),
          );
        }

        if (subSubjects.length === 0) continue;

        const teacher =
          teachers.find(
            teacher => teacher._id === classDoc.subjectTeacherMap[subject.subjectType._id],
          ) ?? null;

        const subjectTeacherObservations = allGradeBookObservations.find(
          gradeBookObservation => gradeBookObservation.topicId === subject.subjectType._id,
        )!;

        subjects.push(
          new GradingEntity({
            name: subject.subjectType.name,
            newId: subject.subjectType.newId,
            coefficient: subject.coefficient,
            studentIds: classDoc.students,
            examGrades: [],
            subTopics: subSubjects,
            teacher: teacher ? UserMapper.toUserProfileDTO(teacher) : null,
            teacherObservations: Object.entries(subjectTeacherObservations.observations).map(
              ([studentId, observation]) => ({
                studentId: studentId as ID,
                observation: observation ?? null,
              }),
            ),
            gradeBookObservationId: subjectTeacherObservations._id,
          }),
        );
      }

      if (subject.exams.length === 0) continue;

      const examGrades = allExamGrades.filter(
        examGrade => examGrade.topicId === subject.subjectType._id,
      );

      const subjectExamGrades = examGrades.map(examGrade => {
        const examType = allExamTypes.find(examType => examType._id === examGrade.examType)!;
        const examCoefficient = subject.exams.find(exam => exam.examType === examType._id)
          ?.coefficient as number;

        return new ExamGrades({
          examType: examType.name,
          examTypeRank: examType.rank,
          coefficient: examCoefficient,
          examGradeId: examGrade._id,
          studentGrades: Object.entries(examGrade.degrees).map(([studentId, degree]) => {
            return {
              studentId: studentId as ID,
              grade: Grade.create(examCoefficient, degree),
            };
          }),
        });
      });

      const teacher =
        teachers.find(
          teacher => teacher._id === classDoc.subjectTeacherMap[subject.subjectType._id],
        ) ?? null;

      const subjectTeacherObservations = allGradeBookObservations.find(
        gradeBookObservation => gradeBookObservation.topicId === subject.subjectType._id,
      )!;

      subjects.push(
        new GradingEntity({
          name: subject.subjectType.name,
          newId: subject.subjectType.newId,
          coefficient: subject.coefficient,
          studentIds: classDoc.students,
          examGrades: subjectExamGrades,
          subTopics: [],
          teacher: teacher ? UserMapper.toUserProfileDTO(teacher) : null,
          teacherObservations: Object.entries(subjectTeacherObservations.observations).map(
            ([studentId, observation]) => ({
              studentId: studentId as ID,
              observation: observation ?? null,
            }),
          ),
          gradeBookObservationId: subjectTeacherObservations._id,
        }),
      );
    }

    const groupGrades: GradingEntity[] = [];
    for (const group of groups) {
      const examGrades = allExamGrades.filter(examGrade => examGrade.topicId === group._id);

      const groupExamGrades = examGrades.map(examGrade => {
        const examType = allExamTypes.find(examType => examType._id === examGrade.examType)!;
        const examCoefficient = group.groupType.exams.find(exam => exam.examType === examType._id)
          ?.coefficient as number;

        return new ExamGrades({
          examType: examType.name,
          examTypeRank: examType.rank,
          coefficient: examCoefficient,
          examGradeId: examGrade._id,
          studentGrades: Object.entries(examGrade.degrees).map(([studentId, degree]) => {
            return {
              studentId: studentId as ID,
              grade: Grade.create(examCoefficient, degree),
            };
          }),
        });
      });

      const teacher = teachers.find(teacher => teacher._id === group.teacher) ?? null;

      const groupTeacherObservations = allGradeBookObservations.find(
        gradeBookObservation => gradeBookObservation.topicId === group._id,
      )!;

      const coefficient = GroupService.getGroupTypeCoefficient(group);

      groupGrades.push(
        new GradingEntity({
          name: group.groupType.name,
          newId: group.groupType.newId,
          coefficient,
          studentIds: group.students,
          examGrades: groupExamGrades,
          subTopics: [],
          teacher: teacher ? UserMapper.toUserProfileDTO(teacher) : null,
          teacherObservations: Object.entries(groupTeacherObservations.observations).map(
            ([studentId, observation]) => ({
              studentId: studentId as ID,
              observation: observation ?? null,
            }),
          ),
          gradeBookObservationId: groupTeacherObservations._id,
        }),
      );
    }

    const classGrades = new SecondaryTermClassGrades({
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
      studentIds: classDoc.students,
      subjects,
      groups: groupGrades,
    });

    return classGrades;
  }

  async loadAnnualClassGrades(classId: ID, termIds: ID[]): Promise<SecondaryAnnualClassGrades> {
    const termClassGrades = await Promise.all(
      termIds.map(termId => this.loadTermClassGrades(classId, termId)),
    );

    return new SecondaryAnnualClassGrades(termClassGrades);
  }

  async loadGroupGrades(groupId: ID, termId: ID): Promise<GradingEntity> {
    const group = await this.groupRepo.findOneByIdOrThrow(groupId, "global.internalError", {
      populate: ["teacher"],
    });

    const allExamTypes = await this.examTypeRepo.findAll();

    const examGrades = await this.examGradeRepo.findAllExamGradesByTerm({
      groupIds: [groupId],
      termId,
    });

    const observations = (
      await this.gradeBookObservationRepo.findAllByTerm({
        groupIds: [groupId],
        termId,
      })
    )[0];

    const coefficient = GroupService.getGroupTypeCoefficient(group);
    return new GradingEntity({
      name: group.groupType.name,
      newId: group.newId,
      coefficient,
      studentIds: group.students,
      examGrades: group.groupType.exams.map(exam => {
        const examType = allExamTypes.find(examType => examType._id === exam.examType)!;
        const examCoefficient = exam.coefficient;
        const examGrade = examGrades.find(examGrade => examGrade.examType === exam.examType)!;

        return new ExamGrades({
          examType: examType.name,
          examTypeRank: examType.rank,
          coefficient: examCoefficient,
          examGradeId: examGrade._id,
          studentGrades: Object.entries(examGrade.degrees).map(([studentId, degree]) => {
            return {
              studentId: studentId as ID,
              grade: Grade.create(examCoefficient, degree),
            };
          }),
        });
      }),
      subTopics: [],
      teacher: UserMapper.toUserProfileDTO(group.teacher),
      teacherObservations: Object.entries(observations.observations).map(
        ([studentId, observation]) => ({
          studentId: studentId as ID,
          observation: observation ?? null,
        }),
      ),
      gradeBookObservationId: observations._id,
    });
  }
}
