import { injectable } from "inversify/lib/inversify";
import { StudentDiplomaDTO } from "../dto/StudentDiploma.dto";
import { inject } from "../../../core/container/TypedContainer";
import { ClassGradeFactory } from "../factories/classGrade.factory";
import { TermRepo } from "../../terms/repos/Term.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { DiplomaRepo } from "../../diploma/Diploma.repo";
import { School } from "../../schools/domain/school.entity";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ESTABLISHMENT_TITLE_ENUM } from "../../levels/domains/level.entity";

@injectable()
export class GetClassDiplomasUseCase {
  constructor(
    @inject("ClassGradeFactory") private classGradeFactory: ClassGradeFactory,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
    @inject("School") private school: School,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
  ) {}

  async execute(classNewId: string, termNewId: string): Promise<StudentDiplomaDTO[]> {
    const term = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students"],
    });

    const schoolYear = await this.schoolYearRepo.findOneByIdOrThrow(
      classDoc.schoolYear,
      "notFound.schoolYear",
      { populate: ["level"] },
    );

    const isTermCompleted = classDoc.gradeReports.some(
      gradeReport => gradeReport.term === term._id,
    );
    if (!isTermCompleted) throw new BadRequestError("term.notCompleted");

    const classGrades = await this.classGradeFactory.createTermGrade({
      classId: classDoc._id,
      termId: term._id,
      examGradeSystem: schoolYear.level.examGradeSystem,
      schoolInstance: this.school.instanceType,
    });

    const allDiplomas = await this.diplomaRepo.findAll();
    const studentDiplomas: StudentDiplomaDTO[] = [];

    for (const student of classDoc.students) {
      const studentAverage = classGrades.calculateStudentAverage(student._id);
      if (studentAverage.mark === null) continue;

      const studentMark = studentAverage.mark;

      const diploma = allDiplomas.find(
        diploma => diploma.minAverage <= studentMark && diploma.maxAverage >= studentMark,
      );
      if (!diploma) continue;

      studentDiplomas.push({
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
      });
    }

    return studentDiplomas;
  }
}
