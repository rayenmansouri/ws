import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { School } from "../../schools/domain/school.entity";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { UserMapper } from "../../users/mappers/User.mapper";
import { PROMOTION_STATUS_ENUM } from "../domain/tunisian/ExamGrade.entity";
import { AnnualAveragesOfClassDTO } from "../dto/AnnualAveragesOfClass.dto";
import { ClassGradeFactory } from "../factories/classGrade.factory";

@injectable()
export class GetAnnualAveragesOfClassUseCase {
  constructor(
    @inject("ClassGradeFactory") private classGradeFactory: ClassGradeFactory,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("School") private school: School,
  ) {}

  async execute(classNewId: string): Promise<AnnualAveragesOfClassDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear", "students"],
    });
    const levelDoc = await this.levelRepo.findOneByIdOrThrow(
      classDoc.schoolYear.level,
      "notFound.level",
    );
    const studentIds = classDoc.students.map(student => student._id);
    const studentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYear(
      studentIds,
      classDoc.schoolYear._id,
    );

    const areAllTermsCompleted = classDoc.gradeReports.length === classDoc.schoolYear.terms.length;
    if (!areAllTermsCompleted) throw new BadRequestError("term.notCompleted");

    const annualClassGrades = await this.classGradeFactory.createAnnualGrade({
      classId: classDoc._id,
      termIds: classDoc.schoolYear.terms.map(term => term._id),
      examGradeSystem: levelDoc.examGradeSystem,
      schoolInstance: this.school.instanceType,
    });

    const studentAverages: AnnualAveragesOfClassDTO["studentAverages"] = [];
    for (const student of classDoc.students) {
      const studentProfile = studentProfiles.find(profile => profile.student === student._id)!;

      const termAverages = annualClassGrades.termClassGrades.reduce((acc, termClassGrades) => {
        acc[termClassGrades.term.name] = termClassGrades
          .calculateStudentAverage(student._id)
          .format();
        return acc;
      }, {} as Record<string, string | null>);

      const annualAverage = annualClassGrades.calculateStudentAnnualAverage(student._id);

      const promotionStatus = annualAverage.isPromoted()
        ? PROMOTION_STATUS_ENUM.PROMOTED
        : studentProfile.isExceptionallyPromoted
        ? PROMOTION_STATUS_ENUM.EXCEPTIONALLY_PROMOTED
        : PROMOTION_STATUS_ENUM.NOT_PROMOTED;

      studentAverages.push({
        student: UserMapper.toUserProfileDTO(student),
        termAverages: termAverages,
        annualAverage: annualAverage.format(),
        rank: null,
        promotionStatus,
      });
    }

    const sortedStudentAverages = studentAverages
      .sort((a, b) => {
        if (!a.annualAverage) return 1;
        if (!b.annualAverage) return -1;

        return +b.annualAverage - +a.annualAverage;
      })
      .map((studentAverage, index) => {
        return {
          ...studentAverage,
          rank: index + 1,
        };
      });

    return {
      termNames: classDoc.schoolYear.terms.map(term => term.name),
      studentAverages: sortedStudentAverages,
    };
  }
}
