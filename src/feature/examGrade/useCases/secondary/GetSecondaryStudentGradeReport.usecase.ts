import { injectable } from "inversify";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { DiplomaRepo } from "../../../diploma/Diploma.repo";
import { Parent } from "../../../parents/domain/parent.entity";
import { School } from "../../../schools/domain/school.entity";
import { SchoolYearRepo } from "../../../schoolYears/domain/SchoolYear.repo";
import { StudentApplicationService } from "../../../students/application/Student.application.service";
import { StudentRepo } from "../../../students/domain/Student.repo";
import { StudentService } from "../../../students/domain/Student.service";
import { StudentProfileRepo } from "../../../students/domain/StudentProfile.repo";
import { BaseUser, TUserTypeEnum } from "../../../users/domain/baseUser.entity";
import { PROMOTION_STATUS_ENUM } from "../../domain/tunisian/ExamGrade.entity";
import { SecondaryClassGradesRepo } from "../../domain/tunisian/secondary/SecondaryClassGrades.repo";
import { SecondaryGradeReportDTO } from "../../dto/secondary/SecondaryGradeReport.dto";
import { SecondaryGradeReportMapper } from "../../mappers/SecondaryGradeReport.mapper";
import { ID } from "./../../../../types/BaseEntity";

export type getSecondaryStudentGradeReport = {
  studentNewId: string;
  termNewId: string;
  schoolYearId?: ID;
  userType: TUserTypeEnum;
  user: BaseUser;
};
@injectable()
export class GetSecondaryStudentGradeReportUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("School") private school: School,
    @inject("SecondaryClassGradesRepo") private secondaryClassGradesRepo: SecondaryClassGradesRepo,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
  ) {}

  async execute(dto: getSecondaryStudentGradeReport): Promise<SecondaryGradeReportDTO> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      dto.studentNewId,
      "notFound.student",
      { populate: ["level"] },
    );

    if (dto.userType === END_USER_ENUM.PARENT)
      StudentService.ensureStudentIsAssignedToParent(student._id, dto.user as Parent);

    let schoolYearId: ID;
    if (dto.schoolYearId)
      schoolYearId = (
        await this.schoolYearRepo.findOneByIdOrThrow(dto.schoolYearId, "notFound.schoolYear")
      )._id;
    else schoolYearId = student.level.currentSchoolYear._id;

    const { level, classId } = await this.studentApplicationService.getAcademicDetailsOfSchoolYear(
      student._id,
      schoolYearId,
    );

    const termDoc = level.currentSchoolYear.terms.find(term => term.newId === dto.termNewId);
    if (!termDoc) throw new NotFoundError("notFound.term");

    if (!classId) throw new BadRequestError("student.notAssignedToClass");
    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "notFound.class");

    const studentProfile = await this.studentProfileRepo.getStudentProfileOfSchoolYearOrThrow(
      student._id,
      level.currentSchoolYear._id,
    );

    const areAllTermsCompleted =
      classDoc.gradeReports.length === level.currentSchoolYear.terms.length;
    const allDiplomas = await this.diplomaRepo.findAll();

    const termIndex = classDoc.gradeReports.findIndex(
      gradeReport => gradeReport.term === termDoc._id,
    );

    const annualClassGrades = await this.secondaryClassGradesRepo.loadAnnualClassGrades(
      classId,
      level.currentSchoolYear.terms.map(term => term._id),
    );

    const allStudentAnnualAverages = areAllTermsCompleted
      ? classDoc.students
          .map(studentId => {
            const studentAnnualAverage = annualClassGrades.calculateStudentAnnualAverage(studentId);

            const isPromoted = studentAnnualAverage.isPromoted();
            const promotionStatus = isPromoted
              ? PROMOTION_STATUS_ENUM.PROMOTED
              : studentProfile.isExceptionallyPromoted
              ? PROMOTION_STATUS_ENUM.EXCEPTIONALLY_PROMOTED
              : PROMOTION_STATUS_ENUM.NOT_PROMOTED;

            return {
              studentId: studentId,
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
    const selectedStudentAnnualAverage = areAllTermsCompleted
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

    const selectedTermGrades =
      annualClassGrades.termClassGrades.at(termIndex) || annualClassGrades.termClassGrades[0];
    const response = SecondaryGradeReportMapper.toDTO({
      student: { ...student, level: student.level._id },
      classGrades: selectedTermGrades,
      school: this.school,
      level,
      term: termDoc,
      allTermAverages,
      annualAverage: areAllTermsCompleted ? selectedStudentAnnualAverage!.annualAverage : null,
      annualRank: areAllTermsCompleted ? selectedStudentAnnualAverage!.annualRank : null,
      promotionStatus: areAllTermsCompleted ? selectedStudentAnnualAverage!.promotionStatus : null,
    });

    return response;
  }
}
