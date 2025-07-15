import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../../students/domain/Student.repo";
import { TLanguageEnum } from "./../../../translation/constants";
import {
  AttendanceDashboardStats,
  SessionApplicationService,
} from "./../../sessionManagement/applicationServices/Session.application.service";
import { StudentService } from "./../../students/domain/Student.service";
import { Parent } from "./../domain/parent.entity";
import { StudentApplicationService } from "../../students/application/Student.application.service";

export type GetChildAttendanceStatsUseCaseRequestDto = {
  studentNewId: string;
  language: TLanguageEnum;
  parent: Parent;
  dateInterval: {
    from: Date;
    to: Date;
  };
};

@injectable()
export class GetChildAttendanceStatsUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("SessionApplicationService")
    private sessionAppService: SessionApplicationService,
    @inject("StudentApplicationService") private studentAppService: StudentApplicationService,
  ) {}

  async execute(dto: GetChildAttendanceStatsUseCaseRequestDto): Promise<AttendanceDashboardStats> {
    const student = await this.studentRepo.findOneByNewIdOrThrow(
      dto.studentNewId,
      "notFound.student",
    );

    StudentService.ensureStudentIsAssignedToParent(student._id, dto.parent);
    StudentService.ensureStudentNotArchived(student);

    const { classId, groupIds } = await this.studentAppService.getCurrentAcademicDetails(student);

    const stats = await this.sessionAppService.getDashboardAttendanceStats(
      {
        classIds: classId ? [classId] : undefined,
        groupIds: groupIds,
        dateInterval: dto.dateInterval,
        studentId: student._id,
      },
      dto.language,
    );

    return stats;
  }
}
