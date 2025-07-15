import { injectable } from "inversify";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { School } from "../../../schools/domain/school.entity";
import { LevelRepo } from "../../../levels/repos/Level.repo";
import { IBClassGradesRepo } from "../../domain/ib/IBClassGrades.repo";
import { IBGradeReportDTO } from "../../dto/ib/IBGradeReport.dto";
import { NotFoundError } from "../../../../core/ApplicationErrors";
import { IBGradeReportMapper } from "../../mappers/IBGradeReport.mapper";
import { SessionRepo } from "../../../sessionManagement/domain/Session.repo";
import { SignatureRepo } from "../../../signatures/domain/Signature.repo";

@injectable()
export class GetAllIBGradeReportsOfClassUseCase {
  constructor(
    @inject("IBClassGradesRepo") private ibClassGradesRepo: IBClassGradesRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("School") private school: School,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SignatureRepo") private signatureRepo: SignatureRepo,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<IBGradeReportDTO[]> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students", "schoolYear"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");
    const level = await this.levelRepo.findOneByIdOrThrow(
      classDoc.schoolYear.level,
      "notFound.level",
    );

    const areAllTermsCompleted =
      classDoc.gradeReports.length === level.currentSchoolYear.terms.length;

    const termIds = level.currentSchoolYear.terms.map(term => term._id);
    const annualClassGrades = await this.ibClassGradesRepo.loadAnnualClassGrades(
      classDoc._id,
      termIds,
    );
    const currentTermClassGrades = annualClassGrades.termClassGrades.find(
      termClassGrades => termClassGrades.term.newId === termNewId,
    );
    if (!currentTermClassGrades) throw new NotFoundError("notFound.term");

    const termInSchoolYear = level.currentSchoolYear.terms.find(term => term.newId === termNewId)!;
    const allStudentAttendanceStats = await Promise.all(
      classDoc.students.map(student =>
        this.sessionRepo.getStudentAttendanceStats(student._id, {
          from: termInSchoolYear.startDate,
          to: termInSchoolYear.endDate,
        }),
      ),
    );

    const signature = await this.signatureRepo.findByClassType(classDoc.classType);

    const studentGradeReports = classDoc.students.map((student, index) => {
      const gradeReport = IBGradeReportMapper.toDTO({
        student,
        classGrades: currentTermClassGrades,
        school: this.school,
        level,
        currentTerm: termDoc,
        termClassGrades: annualClassGrades.termClassGrades,
        annualAverage: areAllTermsCompleted
          ? annualClassGrades.calculateStudentAnnualAverage(student._id)
          : null,
        attendanceStats: allStudentAttendanceStats[index],
        signature,
        classTypeId: classDoc.classType,
      });

      return gradeReport;
    });

    return studentGradeReports;
  }
}
