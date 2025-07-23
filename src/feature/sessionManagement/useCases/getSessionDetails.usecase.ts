import { injectable } from "inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { ForbiddenError } from "../../../core/ApplicationErrors";
import { ID } from "../../../types/BaseEntity";
import { Role } from "../../authorization/domain/role.entity";
import { StudentRepo } from "../../students/domain/Student.repo";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { SessionApplicationService } from "../applicationServices/Session.application.service";
import { SessionRepo } from "../domain/Session.repo";
import { SessionMapper } from "../mapper/Session.mapper";
import {
  SESSION_STATUS_ENUM,
  TAttendanceEnum,
} from "./../../../database/schema/pedagogy/session/session.schema";
import { SessionService } from "./../domain/Session.service";
import { SessionDetailsDTO } from "./../dtos/sessionDetails.dto";

export type GetSessionDetailsRequestDTO = {
  userDetails: { user: Omit<BaseUser, "roles"> & { roles: Role[] }; type: TEndUserEnum };
  sessionNewId: string;
  tenantId: ID;
};

@injectable()
export class GetSessionDetailsUseCase {
  constructor(
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("SessionApplicationService")
    private sessionApplicationService: SessionApplicationService,
  ) {}

  async execute(dto: GetSessionDetailsRequestDTO): Promise<SessionDetailsDTO> {
    const session = await this.sessionRepo.findOneByNewIdOrThrow(
      dto.sessionNewId,
      "notFound.session",
      {
        populate: [
          "classroom",
          "class",
          "group",
          "subjectType",
          "subSubjectType",
          "teacher",
          "classGroup",
        ],
      },
    );

    const isUserAllowedToViewSession =
      await this.sessionApplicationService.isUserAllowedToViewSession(
        dto.userDetails,
        {
          class: session.class?._id || null,
          group: session.group?._id || null,
          teacher: session.teacher?._id || null,
        },
        (session.class?.schoolYear || session.group?.schoolYears) as ID,
      );

    if (!isUserAllowedToViewSession) throw new ForbiddenError("global.accessDenied");

    const studentIds = SessionService.extractStudentIdsFromSession(
      session.class,
      session.classGroup,
      session.group,
    );
    const students = await this.studentRepo.findManyByIds(studentIds);

    let previousAttendance: Record<ID, TAttendanceEnum | null> | null = null;

    if (session.status !== SESSION_STATUS_ENUM.CANCELED)
      previousAttendance = await this.sessionRepo.getLastStudentsAttendanceOfSession(
        { _id: session._id, startTime: session.startTime },
        studentIds,
      );

    const sessionAttendanceDTO = SessionMapper.toSessionAttendanceDTO(
      students,
      session,
      dto.userDetails,
      previousAttendance,
    );

    return SessionMapper.toSessionDetailsDTO({
      session,
      currentTimeOfSchool: getCurrentTimeOfSchool(dto.tenantId),
      sessionAttendance: sessionAttendanceDTO,
    });
  }
}
