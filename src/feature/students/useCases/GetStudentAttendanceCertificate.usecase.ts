import { injectable } from "inversify/lib/inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { School } from "../../schools/domain/school.entity";
import { StudentApplicationService } from "../application/Student.application.service";
import { StudentRepo } from "../domain/Student.repo";
import { AttendanceCertificateDTO } from "../dtos/AttendanceCertficate.dto";
import { ESTABLISHMENT_TITLE_ENUM } from "../../levels/domains/level.entity";

@injectable()
export class GetStudentAttendanceCertificateUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("School") private school: School,
  ) {}

  async execute(studentNewId: string): Promise<AttendanceCertificateDTO> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(studentNewId, "notFound.student");

    const { level, classId } = await this.studentApplicationService.getCurrentAcademicDetails(
      student,
    );

    if (!classId) throw new BadRequestError("student.notAssignedToClass");

    if (!student.birthDate) throw new BadRequestError("missing.birthDate");

    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "notFound.class");

    return {
      educationDepartment: this.school.educationDepartment,
      establishmentTitle: level.establishmentTitle || ESTABLISHMENT_TITLE_ENUM.PRIVATE_PRIMARY,
      schoolId: this.school._id,
      schoolName: this.school.name,
      schoolSubdomain: this.school.subdomain,
      schoolYearName: level.currentSchoolYear.name,
      student: {
        fullName: student.fullName,
        birthDate: student.birthDate,
        className: classDoc.name,
      },
      directorName: this.school.directorName || null,
    };
  }
}
