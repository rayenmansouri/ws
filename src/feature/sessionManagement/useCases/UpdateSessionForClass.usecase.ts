import { injectable } from "inversify/lib/inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { TLanguageEnum } from "../../../translation/constants";
import { ID } from "../../../types/BaseEntity";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassGroupRepo } from "../../classes/domain/classGroup.repo";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { School } from "../../schools/domain/school.entity";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";
import { SessionApplicationService } from "../applicationServices/Session.application.service";
import { Session } from "../domain/session.entity";
import { SessionRepo } from "../domain/Session.repo";
import { SessionService } from "../domain/Session.service";

type UpdateSessionForClassUseCaseRequest = Partial<{
  startTime: Date;
  endTime: Date;
  classroomNewId: string;
  classGroupNewId: string;
  sessionTypeNewId: string;
}>;

type UpdateClassSessionDtoResponse = {
  isValid: boolean;
  sessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    classGroup: string | null;
    group: string | null;
  };
};

@injectable()
export class UpdateSessionForClassUseCase {
  constructor(
    @inject("ClassGroupRepo") private classGroupRepo: ClassGroupRepo,
    @inject("ClassroomRepo") private classRoomRepo: ClassroomRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
    @inject("School") private school: School,
    @inject("SessionApplicationService")
    private sessionApplicationService: SessionApplicationService,
    @inject("Language") private language: TLanguageEnum,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
  ) {}

  async execute(
    sessionNewId: string,
    data: UpdateSessionForClassUseCaseRequest,
  ): Promise<UpdateClassSessionDtoResponse> {
    const { startTime, endTime, classroomNewId, classGroupNewId, sessionTypeNewId } = data;

    const session = await this.sessionRepo.findOneByNewIdOrThrow(sessionNewId, "notFound.session");

    if (!session.class) throw new BadRequestError("cannot update session without class");

    const newStartTime = startTime || session.startTime;
    const newEndTime = endTime || session.endTime;

    let classroomId = session.classroom;

    if (classroomNewId) {
      const classroom = await this.classRoomRepo.findOneByNewIdOrThrow(
        classroomNewId,
        "notFound.classroom",
      );
      classroomId = classroom._id;
    }

    let classGroupId = session.classGroup;
    if (classGroupNewId) {
      const group = await this.classGroupRepo.findOneByNewIdOrThrow(
        classGroupNewId,
        "notFound.group",
      );
      classGroupId = group._id;
    }

    let sessionType = session.sessionType;
    if (sessionTypeNewId) {
      const newSessionType = await this.sessionTypeRepo.findOneByNewIdOrThrow(
        sessionTypeNewId,
        "notFound.sessionType",
      );
      sessionType = newSessionType;
    }

    const currentTime = getCurrentTimeOfSchool(this.school._id);

    if (newStartTime.getTime() < currentTime.getTime()) {
      throw new BadRequestError("session.cannotUpdateInThePast");
    }

    if (newStartTime.getTime() > newEndTime.getTime()) {
      throw new BadRequestError("session.startTimeMustBeBeforeEndTime");
    }

    const result = await this.validateSessionAvailability({
      startTime,
      endTime,
      classroomNewId,
      classroomId,
      newStartTime,
      newEndTime,
      session: { ...session, class: session.class },
      classGroupNewId,
      classGroupId,
    });

    if (!result.isValid) throw new BadRequestError("invalid.session", result);

    await this.sessionRepo.updateOneById(session._id, {
      startTime: newStartTime,
      endTime: newEndTime,
      classroom: classroomId,
      classGroup: classGroupId,
      sessionType,
    });

    return { ...result, sessionId: session._id };
  }

  private async validateSessionAvailability(params: {
    startTime: Date | undefined;
    endTime: Date | undefined;
    classroomNewId: string | undefined;
    classroomId: ID;
    newStartTime: Date;
    newEndTime: Date;
    session: Session & { class: ID };
    classGroupNewId: string | undefined;
    classGroupId: ID | null;
  }): Promise<UpdateClassSessionDtoResponse> {
    const {
      startTime,
      endTime,
      classroomNewId,
      classroomId,
      newStartTime,
      newEndTime,
      session,
      classGroupNewId,
      classGroupId,
    } = params;
    let isClassroomAvailable = true;
    let isTeacherAvailable = true;
    let isClassGroupAvailable = true;
    let isClassAvailable = true;

    const isTimeRangeModified = !!startTime || !!endTime;
    if (isTimeRangeModified || classroomNewId) {
      isClassroomAvailable = await this.sessionApplicationService.isClassroomAvailable({
        classroomId,
        startDate: newStartTime,
        endDate: newEndTime,
        excludeSessionIds: [session._id],
      });
    }

    if (isTimeRangeModified && session.teacher) {
      isTeacherAvailable = await this.sessionApplicationService.isTeacherAvailable({
        teacherId: session.teacher,
        startDate: newStartTime,
        endDate: newEndTime,
        excludeSessionIds: [session._id],
      });
    }

    if ((isTimeRangeModified || classGroupNewId) && classGroupId) {
      isClassGroupAvailable = await this.sessionApplicationService.isClassGroupAvailable({
        classGroupId,
        startDate: newStartTime,
        endDate: newEndTime,
        excludeSessionIds: [session._id],
      });
    }

    if (isTimeRangeModified) {
      isClassAvailable = await this.sessionApplicationService.isClassAvailable({
        classIds: [session.class],
        startDate: newStartTime,
        endDate: newEndTime,
        excludeSessionIds: [session._id],
      });
    }

    const result = SessionService.evaluateSessionRequirements(
      {
        isClassAvailable,
        isClassGroupAvailable,
        isTeacherAvailable,
        isClassroomAvailable,
        isGroupsAvailable: true,
      },
      this.language,
    );

    return { ...result, sessionId: null };
  }
}
