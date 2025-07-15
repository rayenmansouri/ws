import { injectable } from "inversify";
import { PrimaryClassGradesRepo } from "../../domain/tunisian/primary/PrimaryClassGrades.repo";
import { inject } from "../../../../core/container/TypedContainer";
import { PrimaryGradeReportDTO } from "../../dto/primary/PrimaryGradeReport.dto";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { TermRepo } from "../../../terms/repos/Term.repo";
import { PrimaryGradeReportMapper } from "../../mappers/PrimaryGradeReport.mapper";
import { School } from "../../../schools/domain/school.entity";
import { DiplomaRepo } from "../../../diploma/Diploma.repo";
import { LevelRepo } from "../../../levels/repos/Level.repo";
import { Grade } from "../../domain/tunisian/Grade.valueobject";
import { PrimaryTermClassGrades } from "../../domain/tunisian/primary/PrimaryTermClassGrades.entity";
import { PrimaryAnnualClassGrades } from "../../domain/tunisian/primary/PrimaryAnnualClassGrades.entity";
import { ID } from "../../../../types/BaseEntity";

@injectable()
export class GetAllPrimaryGradeReportsOfClassUseCase {
  constructor(
    @inject("PrimaryClassGradesRepo") private primaryClassGradesRepo: PrimaryClassGradesRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("School") private school: School,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async execute(
    classNewId: string,
    termNewId: string,
    templateIds?: ID[],
  ): Promise<PrimaryGradeReportDTO[]> {
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class", {
      populate: ["students", "schoolYear"],
    });
    const termDoc = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");
    const allDiplomas = await this.diplomaRepo.findAll();
    const level = await this.levelRepo.findOneByIdOrThrow(
      classDoc.schoolYear.level,
      "notFound.level",
    );
    const termIds = classDoc.schoolYear.terms.map(term => term._id);

    const areAllTermsCompleted = classDoc.gradeReports.length === classDoc.schoolYear.terms.length;
    const allAnnualClassGrades: PrimaryAnnualClassGrades[] = [];
    const allTermGrades: PrimaryTermClassGrades[] = [];

    if (!templateIds) {
      const annualClassGrades = await this.primaryClassGradesRepo.loadAnnualClassGrades(
        classDoc._id,
        termIds,
      );
      const termIndex = classDoc.schoolYear.terms.findIndex(t => t._id === termDoc._id);
      const termGrades = annualClassGrades.termClassGrades[termIndex];

      allAnnualClassGrades.push(annualClassGrades);
      allTermGrades.push(termGrades);
    }

    if (templateIds) {
      const annualClassGradesPromises = templateIds.map(templateId =>
        this.primaryClassGradesRepo.loadAnnualClassGrades(classDoc._id, termIds, templateId),
      );
      allAnnualClassGrades.push(...(await Promise.all(annualClassGradesPromises)));

      allAnnualClassGrades.forEach(annualClassGrades => {
        const termIndex = classDoc.schoolYear.terms.findIndex(t => t._id === termDoc._id);
        const termGrades = annualClassGrades.termClassGrades[termIndex];

        allTermGrades.push(termGrades);
      });
    }

    const studentGradeReports = classDoc.students.flatMap(student => {
      return allAnnualClassGrades.map((annualClassGrades, index) => {
        const termGrades = allTermGrades[index];

        let studentAnnualAverage: Grade | null = null;
        if (areAllTermsCompleted)
          studentAnnualAverage = annualClassGrades.calculateStudentAnnualAverage(student._id);

        const gradeReport = PrimaryGradeReportMapper.toDTO({
          student,
          classGrades: termGrades,
          school: this.school,
          allDiplomas,
          level,
          term: termDoc,
          studentAnnualAverage,
        });

        return gradeReport;
      });
    });

    return studentGradeReports;
  }
}
