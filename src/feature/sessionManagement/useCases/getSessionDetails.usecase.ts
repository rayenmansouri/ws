import { injectable } from "inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { ForbiddenError } from "../../../core/ApplicationErrors";
import { ID } from "../../../types/BaseEntity";
import { Role } from "../../authorization/domain/role.entity";
import { HomeworkRepo } from "../../homeworks/domain/Homework.repo";
import { HomeworkMapper } from "../../homeworks/mappers/Homework.mapper";
import { ObservationRepo } from "../../observations/domain/Observation.repo";
import { ObservationMapper } from "../../observations/mappers/Observation.mapper";
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
    @inject("HomeworkRepo") private homeworkRepo: HomeworkRepo,
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
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

    const homeworkIds = [...session.homeworkToDo, ...session.homeworkGiven];
    const homeworks = await this.homeworkRepo.findManyByIds(homeworkIds);

    const homeworkToDos = homeworks.filter(homework => session.homeworkToDo.includes(homework._id));
    const homeworkGivens = homeworks.filter(homework =>
      session.homeworkGiven.includes(homework._id),
    );

    const homeworkToDoDTO = homeworkToDos.map(homework =>
      HomeworkMapper.toHomeworkDTO({
        ...homework,
        subjectType: session.subjectType,
        subSubjectType: session.subSubjectType,
        group: session.group,
        class: session.class,
        classGroup: session.classGroup,
        teacher: session.teacher,
      }),
    );
    const homeworkGivenDTO = homeworkGivens.map(homework =>
      HomeworkMapper.toHomeworkDTO({
        ...homework,
        subjectType: session.subjectType,
        subSubjectType: session.subSubjectType,
        group: session.group,
        class: session.class,
        classGroup: session.classGroup,
        teacher: session.teacher,
      }),
    );

    const observations = await this.observationRepo.findManyBySessionId(session._id);
    const topicName =
      session.subSubjectType?.name ||
      session.subjectType?.name ||
      session.group?.groupType?.name ||
      null;

    const observationDTOs = observations.map(observation =>
      ObservationMapper.toObservationDTO(observation, topicName),
    );

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
      homeworkToDo: homeworkToDoDTO,
      homeworkGiven: homeworkGivenDTO,
      observations: observationDTOs,
      currentTimeOfSchool: getCurrentTimeOfSchool(dto.tenantId),
      sessionAttendance: sessionAttendanceDTO,
    });
  }
}
