import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { School } from "../../schools/domain/school.entity";
import { SessionRepo } from "../domain/Session.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { SessionService } from "../domain/Session.service";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { ID } from "../../../types/BaseEntity";
import { SessionApplicationService } from "../applicationServices/Session.application.service";
import { Session } from "../domain/session.entity";
import { TLanguageEnum } from "../../../translation/constants";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";

type UpdateSessionForGroupUseCaseRequest = Partial<{
  startTime: Date;
  endTime: Date;
  classroomNewId: string;
  sessionTypeNewId: string;
}>;

type UpdateSessionForGroupDtoResponse = {
  isValid: boolean;
  sessionId: ID | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    group: string | null;
  };
};

@injectable()
export class UpdateSessionForGroupUseCase {
  constructor(
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
    @inject("School") private school: School,
    @inject("Language") private language: TLanguageEnum,
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("SessionApplicationService")
    private sessionApplicationService: SessionApplicationService,
  ) {}

  async execute(
    sessionNewId: string,
    data: UpdateSessionForGroupUseCaseRequest,
  ): Promise<UpdateSessionForGroupDtoResponse> {
    const { startTime, endTime, classroomNewId, sessionTypeNewId } = data;

    const session = await this.sessionRepo.findOneByNewIdOrThrow(sessionNewId, "notFound.session");

    if (!session.group) throw new BadRequestError("This session is not associated with any group.");

    const newStartTime = startTime || session.startTime;
    const newEndTime = endTime || session.endTime;

    const currentTimeOfSchool = getCurrentTimeOfSchool(this.school._id);

    SessionService.ensureSessionRangeValid(
      { startTime: newStartTime, endTime: newEndTime },
      currentTimeOfSchool,
    );

    let classroomId = session.classroom;
    if (classroomNewId) {
      const classroom = await this.classroomRepo.findOneByNewIdOrThrow(
        classroomNewId,
        "notFound.classroom",
      );
      classroomId = classroom._id;
    }

    let sessionType = session.sessionType;
    if (sessionTypeNewId) {
      const newSessionType = await this.sessionTypeRepo.findOneByNewIdOrThrow(
        sessionTypeNewId,
        "notFound.sessionType",
      );
      sessionType = newSessionType;
    }

    const result = await this.validateSessionAvailability({
      startTime: newStartTime,
      endTime: newEndTime,
      newClassroomNewId: classroomNewId,
      classroomId,
      session: { ...session, group: session.group },
      groupId: session.group,
    });

    if (!result.isValid) throw new BadRequestError("invalid.session", result);

    await this.sessionRepo.updateOneById(session._id, {
      startTime: newStartTime,
      endTime: newEndTime,
      classroom: classroomId,
      sessionType,
    });

    return { ...result, sessionId: session._id };
  }

  private async validateSessionAvailability(params: {
    startTime: Date | undefined;
    endTime: Date | undefined;
    newClassroomNewId: string | undefined;
    classroomId: ID;
    session: Session & { group: ID };
    groupId: ID;
  }): Promise<UpdateSessionForGroupDtoResponse> {
    const { startTime, endTime, newClassroomNewId, classroomId, session, groupId } = params;
    const isTimeRangeModified = !!startTime || !!endTime;
    const newStartTime = startTime || session.startTime;
    const newEndTime = endTime || session.endTime;

    let isGroupAvailable = true;
    if (isTimeRangeModified) {
      isGroupAvailable = await this.sessionApplicationService.isGroupsAvailable({
        groupIds: [groupId],
        startDate: newStartTime,
        endDate: newEndTime,
        excludeSessionIds: [session._id],
      });
    }
    let isClassroomAvailable = true;
    if (isTimeRangeModified && newClassroomNewId) {
      isClassroomAvailable = await this.sessionApplicationService.isClassroomAvailable({
        classroomId,
        startDate: newStartTime,
        endDate: newEndTime,
        excludeSessionIds: [session._id],
      });
    }
    let isTeacherAvailable = true;
    if (isTimeRangeModified && session.teacher) {
      isTeacherAvailable = await this.sessionApplicationService.isTeacherAvailable({
        teacherId: session.teacher,
        startDate: newStartTime,
        endDate: newEndTime,
        excludeSessionIds: [session._id],
      });
    }

    const result = SessionService.evaluateSessionRequirements(
      {
        isClassGroupAvailable: true,
        isClassAvailable: true,
        isClassroomAvailable,
        isGroupsAvailable: isGroupAvailable,
        isTeacherAvailable,
      },
      this.language,
    );

    return { ...result, sessionId: null };
  }
}
