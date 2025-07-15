import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { School } from "../../schools/domain/school.entity";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentProfile } from "../../students/domain/studentProfile.entity";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { PROMOTION_STATUS_ENUM } from "../domain/tunisian/ExamGrade.entity";
import { ClassGradeFactory } from "../factories/classGrade.factory";
import { EXAM_GRADE_SYSTEM_ENUM } from "../../levels/domains/level.entity";

@injectable()
export class SwitchLevelToNextSchoolYearUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ClassGradeFactory") private classGradeFactory: ClassGradeFactory,
    @inject("School") private school: School,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
  ) {}

  async execute(newSchoolYearName: string): Promise<void> {
    const allLevels = await this.levelRepo.findAll();
    const allClassTypes = await this.classTypeRepo.findAll({ populate: ["subLevel"] });
    const schoolYearIds = allLevels.map(level => level.currentSchoolYear._id);
    const allClasses = await this.classRepo.findBySchoolYearIds(schoolYearIds, {
      populate: ["classType"],
    });

    const studentIds = allClasses.flatMap(classDoc => classDoc.students);
    const allStudentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYears(
      studentIds,
      schoolYearIds,
    );

    const canSwitchToNextSchoolYear = allClasses.every(classDoc => {
      const level = allLevels.find(level => level.currentSchoolYear._id === classDoc.schoolYear)!;

      if (level.examGradeSystem === EXAM_GRADE_SYSTEM_ENUM.AUTOMATIC_PROMOTION) return true;

      return classDoc.gradeReports.length === level.currentSchoolYear.terms.length;
    });
    if (!canSwitchToNextSchoolYear) throw new BadRequestError("level.cannotSwitchToNextSchoolYear");

    const newSchoolYears: SchoolYear[] = [];
    for (const level of allLevels) {
      const newStartDate = new Date(level.currentSchoolYear.startDate);
      newStartDate.setFullYear(newStartDate.getFullYear() + 1);
      const newEndDate = new Date(level.currentSchoolYear.endDate);
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);

      const newSchoolYear = await this.schoolYearRepo.addOne({
        name: newSchoolYearName,
        terms: level.currentSchoolYear.terms.map(term => {
          const newTermStartDate = new Date(term.startDate);
          newTermStartDate.setFullYear(newTermStartDate.getFullYear() + 1);
          const newTermEndDate = new Date(term.endDate);
          newTermEndDate.setFullYear(newTermEndDate.getFullYear() + 1);

          return {
            ...term,
            startDate: newTermStartDate,
            endDate: newTermEndDate,
          };
        }),
        level: level._id,
        startDate: newStartDate,
        endDate: newEndDate,
      });

      newSchoolYears.push(newSchoolYear);

      await this.levelRepo.updateSchoolYear(level.currentSchoolYear._id, newSchoolYear);
      await this.subLevelRepo.updateSchoolYear(level.currentSchoolYear._id, newSchoolYear);
    }

    const annualClassGradesOfClasses = await Promise.all(
      allClasses.map(classDoc => {
        const level = allLevels.find(level => level.currentSchoolYear._id === classDoc.schoolYear)!;

        return this.classGradeFactory.createAnnualGrade({
          classId: classDoc._id,
          termIds: level.currentSchoolYear.terms.map(term => term._id),
          examGradeSystem: level.examGradeSystem,
          schoolInstance: this.school.instanceType,
        });
      }),
    );

    const studentsToArchive: ID[] = [];
    const newStudentProfilesPayload: Omit<StudentProfile, keyof BaseEntity>[] = [];
    const updateStudentPayloads: {
      studentId: ID;
      classType: ID;
      level: ID | undefined;
    }[] = [];

    for (const annualClassGrade of annualClassGradesOfClasses) {
      const classDoc = allClasses.find(classDoc => classDoc._id === annualClassGrade.class._id)!;
      const isTerminalClass = classDoc.classType.isTerminal;
      const level = allLevels.find(level => level.currentSchoolYear._id === classDoc.schoolYear)!;

      const nextClassTypeID = classDoc.classType.nextClassTypes?.[0] || null;
      if (!nextClassTypeID && !isTerminalClass)
        throw new BadRequestError("class.withoutNextClassType");

      const nextClassTypeDoc = allClassTypes.find(classType => classType._id === nextClassTypeID);
      const nextLevelID = nextClassTypeDoc ? nextClassTypeDoc?.subLevel.level._id : null;

      const newSchoolYear = nextLevelID
        ? newSchoolYears.find(newSchoolYear => newSchoolYear.level === nextLevelID)!
        : newSchoolYears.find(newSchoolYear => newSchoolYear.level === level._id)!;

      for (const studentId of annualClassGrade.studentIds) {
        const studentProfile = allStudentProfiles.find(profile => profile.student === studentId)!;

        const studentAnnualAverage = annualClassGrade.calculateStudentAnnualAverage(studentId);

        const promotionStatus = studentAnnualAverage.isPromoted()
          ? PROMOTION_STATUS_ENUM.PROMOTED
          : studentProfile.isExceptionallyPromoted
          ? PROMOTION_STATUS_ENUM.EXCEPTIONALLY_PROMOTED
          : PROMOTION_STATUS_ENUM.NOT_PROMOTED;

        if (promotionStatus === PROMOTION_STATUS_ENUM.NOT_PROMOTED) {
          newStudentProfilesPayload.push({
            class: null,
            classGroup: null,
            isExceptionallyPromoted: false,
            groups: [],
            schoolYear: newSchoolYear._id,
            student: studentId,
          });
        } else {
          if (isTerminalClass) {
            studentsToArchive.push(studentId);
            continue;
          }

          updateStudentPayloads.push({
            studentId,
            classType: nextClassTypeID!,
            level: nextLevelID || undefined,
          });

          newStudentProfilesPayload.push({
            class: null,
            classGroup: null,
            isExceptionallyPromoted: false,
            groups: [],
            schoolYear: newSchoolYear._id,
            student: studentId,
          });
        }
      }
    }

    const unenrolledStudents = await this.studentRepo.listAllUnenrolledStudents(schoolYearIds);
    unenrolledStudents.forEach(student => {
      const schoolYear = newSchoolYears.find(
        newSchoolYear => newSchoolYear.level === student.level,
      )!;

      newStudentProfilesPayload.push({
        class: null,
        classGroup: null,
        isExceptionallyPromoted: false,
        groups: [],
        schoolYear: schoolYear._id,
        student: student._id,
      });
    });

    await this.studentRepo.updateManyByIds(studentsToArchive, {
      isArchived: true,
      archivedAt: getCurrentTimeOfSchool(this.school._id),
    });
    await this.studentProfileRepo.addMany(newStudentProfilesPayload);

    await Promise.all(
      updateStudentPayloads.map(studentPayload => {
        const payload: {
          classType: ID;
          level?: ID;
        } = {
          classType: studentPayload.classType,
        };

        if (studentPayload.level) payload.level = studentPayload.level;

        return this.studentRepo.updateOneById(studentPayload.studentId, payload);
      }),
    );
  }
}
