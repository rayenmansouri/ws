import { injectable } from "inversify";
import { inject } from "../../../../core/container/TypedContainer";
import { ID } from "../../../../types/BaseEntity";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { ClassTypeRepo } from "../../../classTypes/repo/ClassType.repo";
import { ExamTypeRepo } from "../../../examTypes/repos/examType.repo";
import { GradeBookObservationRepo } from "../../../gradeBookObservation/GradeBookObservation.repo";
import { GroupService } from "../../../groupManagement/domains/Group.service";
import { GroupRepo } from "../../../groupManagement/repos/Group.repo";
import { StudentProfileRepo } from "../../../students/domain/StudentProfile.repo";
import { TeacherRepo } from "../../../teachers/domain/Teacher.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { UserMapper } from "../../../users/mappers/User.mapper";
import { ExamGradeRepo } from "../tunisian/ExamGrade.repo";
import { BadRequestError, InternalError } from "../../../../core/ApplicationErrors";
import { IBTermClassGrades } from "./IBTermClassGrades.entity";
import { IBGradingEntity } from "./IBGrading.entity";
import { IBExamGrades } from "./IBExamGrades.entity";
import { IBGrade } from "./IBGrade.valueobject";
import { IBAnnualClassGrades } from "./IBAnnualClassGrades.entity";

@injectable()
export class IBClassGradesRepo {
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

  async loadTermClassGrades(classId: ID, termId: ID): Promise<IBTermClassGrades> {
    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "global.internalError");
    const termDoc = await this.termRepo.findOneByIdOrThrow(termId, "global.internalError");

    const studentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYear(
      classDoc.students,
      classDoc.schoolYear,
    );
    const groupIds = Array.from(
      new Set<ID>(
        studentProfiles
          .flatMap(studentProfile => studentProfile.groups)
          .filter(value => value !== null),
      ),
    );
    const groups = await this.groupRepo.findManyByIds(groupIds);

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
      groupIds,
      termId,
    });

    const allGradeBookObservations = await this.gradeBookObservationRepo.findAllByTerm({
      classIds: [classId],
      groupIds,
      termId,
    });

    const subjects: IBGradingEntity[] = [];

    for (const subject of classType.subjects) {
      if (subject.exams.length === 0) continue;

      const examGrades = allExamGrades
        .filter(examGrade => examGrade.topicId === subject.subjectType._id)
        .sort((a, b) => {
          const examTypeA = allExamTypes.find(examType => examType._id === a.examType)!;
          const examTypeB = allExamTypes.find(examType => examType._id === b.examType)!;

          return examTypeA.rank - examTypeB.rank;
        });

      const subjectExamGrades = examGrades.map(examGrade => {
        const examType = allExamTypes.find(examType => examType._id === examGrade.examType)!;
        const examCoefficient = subject.exams.find(exam => exam.examType === examType._id)
          ?.coefficient as number;

        return new IBExamGrades({
          examType: examType.name,
          examTypeRank: examType.rank,
          examGradeId: examGrade._id,
          coefficient: examCoefficient,
          studentGrades: Object.entries(examGrade.degrees).map(([studentId, degree]) => {
            return {
              studentId: studentId as ID,
              grade: IBGrade.create(degree),
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
        new IBGradingEntity({
          name: subject.subjectType.name,
          newId: subject.subjectType.newId,
          coefficient: subject.coefficient,
          studentIds: classDoc.students,
          examGrades: subjectExamGrades,
          teacher: teacher ? UserMapper.toUserProfileDTO(teacher) : null,
          gradeBookObservationId: subjectTeacherObservations._id,
          teacherObservations: Object.entries(subjectTeacherObservations.observations).map(
            ([studentId, observation]) => ({
              studentId: studentId as ID,
              observation: observation ?? null,
            }),
          ),
          teacherInvestments: Object.entries(subjectTeacherObservations.ibInvestments).map(
            ([studentId, investment]) => ({
              studentId: studentId as ID,
              investment: investment ?? null,
            }),
          ),
        }),
      );
    }

    const groupGrades: IBGradingEntity[] = [];
    for (const group of groups) {
      const examGrades = allExamGrades.filter(examGrade => examGrade.topicId === group._id);

      const groupExamGrades = examGrades.map(examGrade => {
        const examType = allExamTypes.find(examType => examType._id === examGrade.examType)!;
        const examCoefficient = group.groupType.exams.find(exam => exam.examType === examType._id)
          ?.coefficient as number;

        return new IBExamGrades({
          examType: examType.name,
          examTypeRank: examType.rank,
          examGradeId: examGrade._id,
          coefficient: examCoefficient,
          studentGrades: Object.entries(examGrade.degrees).map(([studentId, degree]) => {
            return {
              studentId: studentId as ID,
              grade: IBGrade.create(degree),
            };
          }),
        });
      });

      const teacher = teachers.find(teacher => teacher._id === group.teacher) ?? null;

      const groupTeacherObservations = allGradeBookObservations.find(
        gradeBookObservation => gradeBookObservation.topicId === group._id,
      )!;

      groupGrades.push(
        new IBGradingEntity({
          name: group.groupType.name,
          newId: group.groupType.newId,
          coefficient: 1,
          studentIds: group.students,
          examGrades: groupExamGrades,
          teacher: teacher ? UserMapper.toUserProfileDTO(teacher) : null,
          gradeBookObservationId: groupTeacherObservations._id,
          teacherObservations: Object.entries(groupTeacherObservations.observations).map(
            ([studentId, observation]) => ({
              studentId: studentId as ID,
              observation: observation ?? null,
            }),
          ),
          teacherInvestments: Object.entries(groupTeacherObservations.ibInvestments).map(
            ([studentId, investment]) => ({
              studentId: studentId as ID,
              investment: investment ?? null,
            }),
          ),
        }),
      );
    }

    const adminObservations = allGradeBookObservations.find(
      gradeBookObservation =>
        gradeBookObservation.topicId === null &&
        gradeBookObservation.topicType === null &&
        gradeBookObservation.term === termId &&
        gradeBookObservation.class === classId,
    );
    if (!adminObservations) throw new InternalError("global.internalError");

    const classGrades = new IBTermClassGrades({
      classDoc: { _id: classDoc._id, newId: classDoc.newId, name: classDoc.name },
      term: {
        _id: termDoc._id,
        newId: termDoc.newId,
        name: termDoc.name,
        coefficient: termDoc.coefficient,
      },
      studentIds: classDoc.students,
      subjects,
      groups: groupGrades,
      adminObservations: Object.entries(adminObservations.observations).map(
        ([studentId, observation]) => ({
          studentId: studentId as ID,
          observation: observation ?? null,
        }),
      ),
    });

    return classGrades;
  }

  async loadAnnualClassGrades(classId: ID, termIds: ID[]): Promise<IBAnnualClassGrades> {
    const termClassGrades = await Promise.all(
      termIds.map(termId => this.loadTermClassGrades(classId, termId)),
    );

    return new IBAnnualClassGrades(termClassGrades);
  }

  async loadGroupGrades(groupId: ID, termId: ID): Promise<IBGradingEntity> {
    const group = await this.groupRepo.findOneByIdOrThrow(groupId, "global.internalError", {
      populate: ["teacher"],
    });

    if (!GroupService.isIncludedInGradeBook(group))
      throw new BadRequestError("Group is Not Include In GradeBook");

    const allExamTypes = await this.examTypeRepo.findAll();

    const examGrades = await this.examGradeRepo.findAllExamGradesByTerm({
      groupIds: [groupId],
      termId,
    });

    const gradeBookObservation = (
      await this.gradeBookObservationRepo.findAllByTerm({
        groupIds: [groupId],
        termId,
      })
    ).at(0);

    if (!gradeBookObservation) throw new InternalError("NO GRADE_BOOK OBSERVATION found");

    const coefficient = GroupService.getGroupTypeCoefficient(group);

    return new IBGradingEntity({
      name: group.groupType.name,
      newId: group.newId,
      coefficient,
      studentIds: group.students,
      teacher: UserMapper.toUserProfileDTO(group.teacher),
      gradeBookObservationId: gradeBookObservation._id,
      teacherObservations: Object.entries(gradeBookObservation.observations).map(
        ([studentId, observation]) => ({
          studentId: studentId as ID,
          observation: observation ?? null,
        }),
      ),
      teacherInvestments: Object.entries(gradeBookObservation.ibInvestments).map(
        ([studentId, investment]) => ({
          studentId: studentId as ID,
          investment: investment ?? null,
        }),
      ),
      examGrades: group.groupType.exams.map(exam => {
        const examType = allExamTypes.find(examType => examType._id === exam.examType)!;
        const examGrade = examGrades.find(examGrade => examGrade.examType === exam.examType)!;

        return new IBExamGrades({
          coefficient: exam.coefficient,
          examType: examType.name,
          examTypeRank: examType.rank,
          examGradeId: examGrade._id,
          studentGrades: Object.entries(examGrade.degrees).map(([studentId, degree]) => {
            return {
              studentId: studentId as ID,
              grade: IBGrade.create(degree),
            };
          }),
        });
      }),
    });
  }
}
