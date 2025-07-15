import { injectable } from "inversify/lib/inversify";
import { BadRequestError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ID } from "../../../../types/BaseEntity";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { DiplomaRepo } from "../../../diploma/Diploma.repo";
import { LevelRepo } from "../../../levels/repos/Level.repo";
import { School } from "../../../schools/domain/school.entity";
import { SchoolYearRepo } from "../../../schoolYears/domain/SchoolYear.repo";
import { StudentApplicationService } from "../../../students/application/Student.application.service";
import { StudentRepo } from "../../../students/domain/Student.repo";
import { Grade } from "../../domain/tunisian/Grade.valueobject";
import { PrimaryAnnualClassGrades } from "../../domain/tunisian/primary/PrimaryAnnualClassGrades.entity";
import { PrimaryClassGradesRepo } from "../../domain/tunisian/primary/PrimaryClassGrades.repo";
import { PrimaryTermClassGrades } from "../../domain/tunisian/primary/PrimaryTermClassGrades.entity";
import { PrimaryGradeReportDTO } from "../../dto/primary/PrimaryGradeReport.dto";
import { PrimaryGradeReportMapper } from "../../mappers/PrimaryGradeReport.mapper";
import { BaseUser, TUserTypeEnum } from "../../../users/domain/baseUser.entity";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { StudentService } from "../../../students/domain/Student.service";
import { Parent } from "../../../parents/domain/parent.entity";

export type getPrimaryStudentGradeReport = {
  studentNewId: string;
  termNewId: string;
  schoolYearId?: ID;
  userType: TUserTypeEnum;
  user: BaseUser;
  templateIds?: ID[];
};
@injectable()
export class GetPrimaryStudentGradeReportUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("School") private school: School,
    @inject("PrimaryClassGradesRepo") private primaryClassGradesRepo: PrimaryClassGradesRepo,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async execute(dto: getPrimaryStudentGradeReport): Promise<PrimaryGradeReportDTO[]> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      dto.studentNewId,
      "notFound.student",
      { populate: ["level"] },
    );

    if (dto.userType === END_USER_ENUM.PARENT)
      StudentService.ensureStudentIsAssignedToParent(student._id, dto.user as Parent);

    const schoolYearId = dto.schoolYearId
      ? (await this.schoolYearRepo.findOneByIdOrThrow(dto.schoolYearId, "notFound.schoolYear"))._id
      : student.level.currentSchoolYear._id;

    const { level, classId } = await this.studentApplicationService.getAcademicDetailsOfSchoolYear(
      student._id,
      schoolYearId,
    );

    if (!classId) throw new BadRequestError("student.notAssignedToClass");

    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "notFound.class", {
      populate: ["schoolYear"],
    });

    const termDoc = classDoc.schoolYear.terms.find(term => term.newId === dto.termNewId);
    if (!termDoc) throw new Error("notFound.term");
    const termIds = classDoc.schoolYear.terms.map(term => term._id);

    const areAllTermsCompleted = classDoc.gradeReports.length === classDoc.schoolYear.terms.length;
    const allAnnualClassGrades: PrimaryAnnualClassGrades[] = [];
    const allTermGrades: PrimaryTermClassGrades[] = [];

    if (!dto.templateIds) {
      const annualClassGrades = await this.primaryClassGradesRepo.loadAnnualClassGrades(
        classDoc._id,
        termIds,
      );
      const termIndex = classDoc.schoolYear.terms.findIndex(t => t._id === termDoc._id);
      const termGrades = annualClassGrades.termClassGrades[termIndex];

      allAnnualClassGrades.push(annualClassGrades);
      allTermGrades.push(termGrades);
    }

    if (dto.templateIds) {
      const annualClassGradesPromises = dto.templateIds.map(templateId =>
        this.primaryClassGradesRepo.loadAnnualClassGrades(classDoc._id, termIds, templateId),
      );
      allAnnualClassGrades.push(...(await Promise.all(annualClassGradesPromises)));

      allAnnualClassGrades.forEach(annualClassGrades => {
        const termIndex = classDoc.schoolYear.terms.findIndex(t => t._id === termDoc._id);
        const termGrades = annualClassGrades.termClassGrades[termIndex];

        allTermGrades.push(termGrades);
      });
    }

    const allDiplomas = await this.diplomaRepo.findAll();

    const response = allAnnualClassGrades.map((allAnnualClassGrades, index) => {
      const termClassGrades = allTermGrades[index];

      let studentAnnualAverage: Grade | null = null;
      if (areAllTermsCompleted)
        studentAnnualAverage = allAnnualClassGrades.calculateStudentAnnualAverage(student._id);

      return PrimaryGradeReportMapper.toDTO({
        student: { ...student, level: student.level._id },
        classGrades: termClassGrades,
        school: this.school,
        level,
        allDiplomas,
        term: termDoc,
        studentAnnualAverage,
      });
    });

    return response;
  }
}
