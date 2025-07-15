import { injectable } from "inversify";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { School } from "../../../schools/domain/school.entity";
import { DiplomaRepo } from "../../../diploma/Diploma.repo";
import { LevelRepo } from "../../../levels/repos/Level.repo";
import { CambridgeClassGradesRepo } from "../../domain/cambridge/CambridgeClassGrades.repo";
import { CambridgeGradeReportDTO } from "../../dto/cambridge/CambridgeGradeReport.dto";
import { CambridgeGradeReportMapper } from "../../mappers/CambridgeGradeReport.mapper";

@injectable()
export class GetAllCambridgeGradeReportsOfClassUseCase {
  constructor(
    @inject("CambridgeClassGradesRepo") private cambridgeClassGradesRepo: CambridgeClassGradesRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("School") private school: School,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<CambridgeGradeReportDTO[]> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students", "schoolYear"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");
    const allDiplomas = await this.diplomaRepo.findAll();
    const level = await this.levelRepo.findOneByIdOrThrow(
      classDoc.schoolYear.level,
      "notFound.level",
    );
    const classGrades = await this.cambridgeClassGradesRepo.loadTermClassGrades(
      classDoc._id,
      termDoc._id,
    );

    const studentGradeReports = classDoc.students.map(student => {
      const gradeReport = CambridgeGradeReportMapper.toDTO({
        student,
        classGrades,
        school: this.school,
        allDiplomas,
        level,
        currentTerm: termDoc,
      });

      return gradeReport;
    });

    return studentGradeReports;
  }
}
