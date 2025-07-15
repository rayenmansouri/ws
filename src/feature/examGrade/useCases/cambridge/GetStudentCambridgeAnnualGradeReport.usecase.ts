import { injectable } from "inversify";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { School } from "../../../schools/domain/school.entity";
import { StudentRepo } from "../../../students/domain/Student.repo";
import { CambridgeClassGradesRepo } from "../../domain/cambridge/CambridgeClassGrades.repo";
import { CambridgeAnnualGradeReportDTO } from "../../dto/cambridge/CambridgeAnnualGradeReport.dto";
import { CambridgeAnnualGradeReportMapper } from "../../mappers/CambridgeAnnualGradeReport.mapper";

@injectable()
export class GetStudentCambridgeAnnualGradeReportUseCase {
  constructor(
    @inject("CambridgeClassGradesRepo") private cambridgeClassGradesRepo: CambridgeClassGradesRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("School") private school: School,
  ) {}

  async execute(classNewId: string, studentNewId: string): Promise<CambridgeAnnualGradeReportDTO> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["schoolYear"],
    });
    const studentDoc = await this.studentRepo.findOneByNewIdOrThrow(
      studentNewId,
      "notFound.student",
    );

    const isStudentInClass = classDoc.students.includes(studentDoc._id);
    if (!isStudentInClass) throw new BadRequestError("student.notAssignedToClass");

    const annualGrades = await this.cambridgeClassGradesRepo.loadAnnualClassGrades(
      classDoc._id,
      classDoc.schoolYear.terms.map(term => term._id),
    );

    return CambridgeAnnualGradeReportMapper.toDTO({
      annualGrades,
      school: this.school,
      student: studentDoc,
      schoolYear: classDoc.schoolYear,
    });
  }
}
