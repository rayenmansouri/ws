import { injectable } from "inversify/lib/inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { DiplomaRepo } from "../../diploma/Diploma.repo";
import { ESTABLISHMENT_TITLE_ENUM } from "../../levels/domains/level.entity";
import { School } from "../../schools/domain/school.entity";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { TermRepo } from "../../terms/repos/Term.repo";
import { StudentDiplomaDTO } from "../dto/StudentDiploma.dto";
import { ClassGradeFactory } from "../factories/classGrade.factory";
import { ID } from "./../../../types/BaseEntity";

export type getStudentDiplomaRequestDto = {
  studentNewId: string;
  termNewId: string;
  schoolYearId: ID;
};

@injectable()
export class GetStudentDiplomaUseCase {
  constructor(
    @inject("ClassGradeFactory") private classGradeFactory: ClassGradeFactory,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
    @inject("School") private school: School,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
  ) {}

  async execute(dto: getStudentDiplomaRequestDto): Promise<StudentDiplomaDTO> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      dto.studentNewId,
      "notFound.student",
    );

    const schoolYear = await this.schoolYearRepo.findOneByIdOrThrow(
      dto.schoolYearId,
      "notFound.schoolYear",
      { populate: ["level"] },
    );

    const { classId } = await this.studentApplicationService.getAcademicDetailsOfSchoolYear(
      student._id,
      schoolYear._id,
    );
    if (!classId) throw new BadRequestError("student.notAssignedToClass");

    const term = await this.termRepo.findOneByNewIdOrThrow(dto.termNewId, "notFound.term");
    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "notFound.class");

    const isTermCompleted = classDoc.gradeReports.some(
      gradeReport => gradeReport.term === term._id,
    );
    if (!isTermCompleted) throw new BadRequestError("term.notCompleted");

    const classGrades = await this.classGradeFactory.createTermGrade({
      classId,
      termId: term._id,
      examGradeSystem: schoolYear.level.examGradeSystem,
      schoolInstance: this.school.instanceType,
    });
    const studentAverage = classGrades.calculateStudentAverage(student._id);
    if (studentAverage.mark === null) throw new BadRequestError("student.noAverage");

    const diploma = await this.diplomaRepo.findOneByAverage(studentAverage.mark);
    if (!diploma) throw new BadRequestError("student.noDiploma");

    return {
      schoolId: this.school._id,
      studentFullName: student.fullName,
      className: classDoc.name,
      establishmentTitle:
        schoolYear.level.establishmentTitle || ESTABLISHMENT_TITLE_ENUM.PRIVATE_PRIMARY,
      educationDepartment: this.school.educationDepartment,
      schoolYearName: schoolYear.name,
      termName: term.name,
      diplomaName: diploma.name,
      diplomaTemplate: diploma.template,
      schoolName: this.school.name,
      directorName: this.school.directorName || null,
    };
  }
}
