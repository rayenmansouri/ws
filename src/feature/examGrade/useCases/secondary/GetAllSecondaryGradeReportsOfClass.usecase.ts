import { injectable } from "inversify";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { DiplomaRepo } from "../../../diploma/Diploma.repo";
import { LevelRepo } from "../../../levels/repos/Level.repo";
import { School } from "../../../schools/domain/school.entity";
import { StudentProfileRepo } from "../../../students/domain/StudentProfile.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { PROMOTION_STATUS_ENUM } from "../../domain/tunisian/ExamGrade.entity";
import { SecondaryClassGradesRepo } from "../../domain/tunisian/secondary/SecondaryClassGrades.repo";
import { SecondaryGradeReportDTO } from "../../dto/secondary/SecondaryGradeReport.dto";
import { SecondaryGradeReportMapper } from "../../mappers/SecondaryGradeReport.mapper";

@injectable()
export class GetAllSecondaryGradeReportsOfClassUseCase {
  constructor(
    @inject("SecondaryClassGradesRepo") private secondaryClassGradesRepo: SecondaryClassGradesRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("School") private school: School,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<SecondaryGradeReportDTO[]> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students", "schoolYear"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");
    const termIndex = classDoc.gradeReports.findIndex(
      gradeReport => gradeReport.term === termDoc._id,
    );
    if (termIndex === -1) throw new BadRequestError("term.notCompleted");

    const allDiplomas = await this.diplomaRepo.findAll();
    const areAllTermsCompleted = classDoc.gradeReports.length === classDoc.schoolYear.terms.length;

    const level = await this.levelRepo.findOneByIdOrThrow(
      classDoc.schoolYear.level,
      "notFound.level",
    );
    const allStudentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYear(
      classDoc.students.map(student => student._id),
      classDoc.schoolYear._id,
    );

    const annualClassGrades = await this.secondaryClassGradesRepo.loadAnnualClassGrades(
      classDoc._id,
      classDoc.schoolYear.terms.map(term => term._id),
    );

    const allStudentAnnualAverages = areAllTermsCompleted
      ? classDoc.students
          .map(student => {
            const studentAnnualAverage = annualClassGrades.calculateStudentAnnualAverage(
              student._id,
            );

            const studentProfile = allStudentProfiles.find(
              profile => profile.student === student._id,
            )!;

            const isPromoted = studentAnnualAverage.isPromoted();
            const promotionStatus = isPromoted
              ? PROMOTION_STATUS_ENUM.PROMOTED
              : studentProfile.isExceptionallyPromoted
              ? PROMOTION_STATUS_ENUM.EXCEPTIONALLY_PROMOTED
              : PROMOTION_STATUS_ENUM.NOT_PROMOTED;

            return {
              studentId: student._id,
              annualAverage: studentAnnualAverage.format(),
              annualRank: null,
              promotionStatus,
            };
          })
          .sort((a, b) => {
            if (!a.annualAverage) return 1;
            if (!b.annualAverage) return -1;

            return +b.annualAverage - +a.annualAverage;
          })
          .map((studentAnnualAverage, index) => {
            return {
              ...studentAnnualAverage,
              annualRank: index + 1,
            };
          })
      : null;

    const selectedTermGrades = annualClassGrades.termClassGrades[termIndex];

    const studentGradeReports = classDoc.students.map(student => {
      const studentAnnualData = areAllTermsCompleted
        ? allStudentAnnualAverages!.find(
            studentAnnualAverage => studentAnnualAverage.studentId === student._id,
          )!
        : null;

      const allTermAverages = annualClassGrades.termClassGrades.map(termGrades => {
        const termAverage = termGrades.calculateStudentAverage(student._id);

        return {
          termName: termGrades.term.name,
          average: termAverage.format(),
          rank: termGrades.calculateStudentRank(student._id),
          diplomaName:
            allDiplomas.find(
              diploma =>
                termAverage.mark !== null &&
                termAverage.mark >= diploma.minAverage &&
                termAverage.mark <= diploma.maxAverage,
            )?.name || null,
        };
      });

      const gradeReport = SecondaryGradeReportMapper.toDTO({
        student,
        classGrades: selectedTermGrades,
        school: this.school,
        level,
        term: termDoc,
        annualAverage: areAllTermsCompleted ? studentAnnualData!.annualAverage : null,
        annualRank: areAllTermsCompleted ? studentAnnualData!.annualRank : null,
        allTermAverages,
        promotionStatus: areAllTermsCompleted ? studentAnnualData!.promotionStatus : null,
      });

      return gradeReport;
    });

    return studentGradeReports;
  }
}
