import { injectable } from "inversify";
import { CambridgeClassGradesRepo } from "../../domain/cambridge/CambridgeClassGrades.repo";
import { inject } from "../../../../core/container/TypedContainer";
import { CambridgeAnnualGradeReportDTO } from "../../dto/cambridge/CambridgeAnnualGradeReport.dto";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { CambridgeAnnualGradeReportMapper } from "../../mappers/CambridgeAnnualGradeReport.mapper";
import { School } from "../../../schools/domain/school.entity";

@injectable()
export class GetAllCambridgeAnnualGradeReportsOfClassUseCase {
  constructor(
    @inject("CambridgeClassGradesRepo") private cambridgeClassGradesRepo: CambridgeClassGradesRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("School") private school: School,
  ) {}

  async execute(classNewId: string): Promise<CambridgeAnnualGradeReportDTO[]> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear", "students"],
    });

    const annualGrades = await this.cambridgeClassGradesRepo.loadAnnualClassGrades(
      classDoc._id,
      classDoc.schoolYear.terms.map(term => term._id),
    );

    return classDoc.students.map(student =>
      CambridgeAnnualGradeReportMapper.toDTO({
        annualGrades,
        student,
        school: this.school,
        schoolYear: classDoc.schoolYear,
      }),
    );
  }
}
