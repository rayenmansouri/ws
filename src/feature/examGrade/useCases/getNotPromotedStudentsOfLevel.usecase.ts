import { injectable } from "inversify";
import { NotPromotedStudentDTO } from "../dto/NotPromotedStudents.dto";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { School } from "../../schools/domain/school.entity";
import { ClassGradeFactory } from "../factories/classGrade.factory";
import { IGrade } from "../domain/Grade.interface";
import { ID } from "../../../types/BaseEntity";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { PROMOTION_STATUS_ENUM } from "../domain/tunisian/ExamGrade.entity";
import { UserMapper } from "../../users/mappers/User.mapper";

@injectable()
export class GetNotPromotedStudentsUsecase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("School") private school: School,
    @inject("ClassGradeFactory") private classGradeFactory: ClassGradeFactory,
  ) {}

  async execute(): Promise<NotPromotedStudentDTO> {
    const allLevels = await this.levelRepo.findAll();
    const schoolYearIds = allLevels.map(level => level.currentSchoolYear._id);
    const classes = await this.classRepo.findBySchoolYearIds(schoolYearIds);

    const allAnnualClassGrades = await Promise.all(
      classes.map(classDoc => {
        const level = allLevels.find(level => level.currentSchoolYear._id === classDoc.schoolYear)!;
        const termIds = level.currentSchoolYear.terms.map(term => term._id);

        return this.classGradeFactory.createAnnualGrade({
          classId: classDoc._id,
          termIds,
          examGradeSystem: level.examGradeSystem,
          schoolInstance: this.school.instanceType,
        });
      }),
    );

    const notPromotedStudents: {
      studentId: ID;
      className: string;
      annualAverage: IGrade;
      termAverages: Record<string, string | null>;
    }[] = [];
    for (const annualClassGrades of allAnnualClassGrades) {
      for (const studentId of annualClassGrades.studentIds) {
        const studentAnnualAverage = annualClassGrades.calculateStudentAnnualAverage(studentId);
        const isPromoted = studentAnnualAverage.isPromoted();

        if (isPromoted) continue;

        notPromotedStudents.push({
          studentId,
          className: annualClassGrades.class.name,
          annualAverage: studentAnnualAverage,
          termAverages: annualClassGrades.termClassGrades.reduce((acc, termClassGrades) => {
            acc[termClassGrades.term.name] = termClassGrades
              .calculateStudentAverage(studentId)
              .format();
            return acc;
          }, {} as Record<string, string | null>),
        });
      }
    }

    const studentIds = notPromotedStudents.map(student => student.studentId);
    const studentDocs = await this.studentRepo.findManyByIds(studentIds);
    const studentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYears(
      studentIds,
      schoolYearIds,
    );

    const students: NotPromotedStudentDTO["students"] = notPromotedStudents.map(record => {
      const studentProfile = studentProfiles.find(profile => profile.student === record.studentId)!;
      const studentDoc = studentDocs.find(s => s._id === record.studentId)!;

      const promotionStatus = studentProfile.isExceptionallyPromoted
        ? PROMOTION_STATUS_ENUM.EXCEPTIONALLY_PROMOTED
        : PROMOTION_STATUS_ENUM.NOT_PROMOTED;

      return {
        ...UserMapper.toUserProfileDTO(studentDoc),
        annualAverage: record.annualAverage.format(),
        termAverages: record.termAverages,
        promotionStatus,
        className: record.className,
      };
    });

    const termNames = new Set(
      allLevels.flatMap(level => level.currentSchoolYear.terms.map(term => term.name)),
    );
    return {
      students: students,
      termNames: Array.from(termNames),
    };
  }
}
