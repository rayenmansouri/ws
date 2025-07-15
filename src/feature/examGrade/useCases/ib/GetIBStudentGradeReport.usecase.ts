import { ID } from "./../../../../types/BaseEntity";
import { injectable } from "inversify/lib/inversify";
import { END_USER_ENUM } from "../../../../constants/globalEnums";
import { BadRequestError, NotFoundError } from "../../../../core/ApplicationErrors";
import { inject } from "../../../../core/container/TypedContainer";
import { ClassRepo } from "../../../classes/domain/Class.repo";
import { LevelRepo } from "../../../levels/repos/Level.repo";
import { Parent } from "../../../parents/domain/parent.entity";
import { School } from "../../../schools/domain/school.entity";
import { SessionRepo } from "../../../sessionManagement/domain/Session.repo";
import { StudentRepo } from "../../../students/domain/Student.repo";
import { StudentService } from "../../../students/domain/Student.service";
import { StudentProfileRepo } from "../../../students/domain/StudentProfile.repo";
import { BaseUser, TUserTypeEnum } from "../../../users/domain/baseUser.entity";
import { IBClassGradesRepo } from "../../domain/ib/IBClassGrades.repo";
import { IBGradeReportDTO } from "../../dto/ib/IBGradeReport.dto";
import { IBGradeReportMapper } from "../../mappers/IBGradeReport.mapper";
import { SchoolYearRepo } from "../../../schoolYears/domain/SchoolYear.repo";
import { SignatureRepo } from "../../../signatures/domain/Signature.repo";

@injectable()
export class GetIBStudentGradeReportUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("School") private school: School,
    @inject("IBClassGradesRepo") private ibClassGradesRepo: IBClassGradesRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
    @inject("SignatureRepo") private signatureRepo: SignatureRepo,
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
  }): Promise<IBGradeReportDTO> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student", {
      populate: ["level"],
    });

    if (userType === END_USER_ENUM.PARENT)
      StudentService.ensureStudentIsAssignedToParent(student._id, user as Parent);

    const schoolYear = schoolYearId
      ? await this.schoolYearRepo.findOneByIdOrThrow(schoolYearId, "notFound.schoolYear")
      : student.level.currentSchoolYear;

    const studentProfile = await this.studentProfileRepo.getStudentProfileOfSchoolYearOrThrow(
      student._id,
      schoolYear._id,
    );
    if (!studentProfile.class) throw new BadRequestError("student.notAssignedToClass");

    const classDoc = await this.classRepo.findOneByIdOrThrow(
      studentProfile.class,
      "notFound.class",
    );
    const areAllTermsCompleted = classDoc.gradeReports.length === schoolYear.terms.length;

    const termIds = schoolYear.terms.map(term => term._id);
    const currentTermDoc = schoolYear.terms.find(term => term.newId === termNewId);
    if (!currentTermDoc) throw new BadRequestError("notFound.term");

    const annualClassGrades = await this.ibClassGradesRepo.loadAnnualClassGrades(
      studentProfile.class,
      termIds,
    );
    const currentTermClassGrades = annualClassGrades.termClassGrades.find(
      termClassGrades => termClassGrades.term.newId === termNewId,
    );
    if (!currentTermClassGrades) throw new NotFoundError("notFound.term");

    const attendanceStats = await this.sessionRepo.getStudentAttendanceStats(student._id, {
      from: currentTermDoc.startDate,
      to: currentTermDoc.endDate,
    });

    const signature = await this.signatureRepo.findByClassType(classDoc.classType);

    const response = IBGradeReportMapper.toDTO({
      student: {
        ...student,
        level: student.level._id,
      },
      classGrades: currentTermClassGrades,
      school: this.school,
      level: student.level,
      currentTerm: currentTermDoc,
      termClassGrades: annualClassGrades.termClassGrades,
      annualAverage: areAllTermsCompleted
        ? annualClassGrades.calculateStudentAnnualAverage(student._id)
        : null,
      attendanceStats,
      signature,
      classTypeId: classDoc.classType,
    });

    return response;
  }
}
