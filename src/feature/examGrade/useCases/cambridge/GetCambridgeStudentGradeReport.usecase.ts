import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { inject } from "../../../../core/container/TypedContainer";
import { DiplomaRepo } from "../../../diploma/Diploma.repo";
import { Parent } from "../../../parents/domain/parent.entity";
import { School } from "../../../schools/domain/school.entity";
import { SchoolYearRepo } from "../../../schoolYears/domain/SchoolYear.repo";
import { StudentRepo } from "../../../students/domain/Student.repo";
import { StudentService } from "../../../students/domain/Student.service";
import { StudentProfileRepo } from "../../../students/domain/StudentProfile.repo";
import { BaseUser, TUserTypeEnum } from "../../../users/domain/baseUser.entity";
import { CambridgeClassGradesRepo } from "../../domain/cambridge/CambridgeClassGrades.repo";
import { CambridgeGradeReportDTO } from "../../dto/cambridge/CambridgeGradeReport.dto";
import { CambridgeGradeReportMapper } from "../../mappers/CambridgeGradeReport.mapper";
import { ID } from "./../../../../types/BaseEntity";

@injectable()
export class GetCambridgeStudentGradeReportUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("School") private school: School,
    @inject("DiplomaRepo") private diplomaRepo: DiplomaRepo,
    @inject("CambridgeClassGradesRepo") private cambridgeClassGradesRepo: CambridgeClassGradesRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
  ) {}

  async execute({
    studentNewId,
    termNewId,
    userType,
    user,
    schoolYearId,
  }: {
    studentNewId: string;
    termNewId: string;
    userType: TUserTypeEnum;
    user: BaseUser;
    schoolYearId?: ID;
  }): Promise<CambridgeGradeReportDTO> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student", {
      populate: ["level"],
    });

    if (userType === END_USER_ENUM.PARENT)
      StudentService.ensureStudentIsAssignedToParent(student._id, user as Parent);

    const schoolYear = schoolYearId
      ? await this.schoolYearRepo.findOneByIdOrThrow(schoolYearId, "notFound.schoolYear")
      : student.level.currentSchoolYear;

    const allDiplomas = await this.diplomaRepo.findAll();
    const studentProfile = await this.studentProfileRepo.getStudentProfileOfSchoolYearOrThrow(
      student._id,
      schoolYear._id,
    );

    const term = schoolYear.terms.find(term => term.newId === termNewId);
    if (!term) throw new Error("notFound.term");

    if (!studentProfile.class) throw new Error("global.internalError");

    const classGrades = await this.cambridgeClassGradesRepo.loadTermClassGrades(
      studentProfile.class,
      term._id,
    );

    const response = CambridgeGradeReportMapper.toDTO({
      student: {
        ...student,
        level: student.level._id,
      },
      classGrades,
      school: this.school,
      level: student.level,
      allDiplomas,
      currentTerm: term,
    });

    return response;
  }
}
