import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { SESSION_STATUS_ENUM } from "../../../database/schema/pedagogy/session/session.schema";
import { TLanguageEnum } from "../../../translation/constants";
import { Classroom } from "../../classrooms/domains/classroom.entity";
import { ClassroomRepo } from "../../classrooms/domains/classroom.repo";
import { Group } from "../../groupManagement/domains/group.entity";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { School } from "../../schools/domain/school.entity";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { SessionApplicationService } from "../applicationServices/Session.application.service";
import { SessionRepo } from "../domain/Session.repo";
import { SessionService } from "../domain/Session.service";
import { SessionTypeRepo } from "../../sessionTypes/repos/SessionType.repo";

type AddSessionForGroupDtoRequest = {
  sessionTypeNewId: string;
  classroomNewId: string;
  groupNewId: string;
  startTime: Date;
  endTime: Date;
};

type AddSessionForGroupResponse = {
  isValid: boolean;
  sessionId: string | null;
  errors: {
    teacher: string | null;
    classroom: string | null;
    class: string | null;
    group: string | null;
  };
};

@injectable()
export class AddSessionForGroupUseCase {
  constructor(
    @inject("ClassroomRepo") private classroomRepo: ClassroomRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("School") private school: School,
    @inject("SessionApplicationService")
    private sessionApplicationService: SessionApplicationService,
    @inject("Language") private language: TLanguageEnum,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {}

  async execute(data: AddSessionForGroupDtoRequest): Promise<AddSessionForGroupResponse> {
    const { sessionTypeNewId, classroomNewId, groupNewId, startTime, endTime } = data;
    const currentTimeOfSchool = getCurrentTimeOfSchool(this.school._id);

    SessionService.ensureSessionRangeValid({ startTime, endTime }, currentTimeOfSchool);

    const sessionType = await this.sessionTypeRepo.findOneByNewIdOrThrow(
      sessionTypeNewId,
      "notFound.sessionType",
    );

    const group = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    const classroom = await this.classroomRepo.findOneByNewIdOrThrow(
      classroomNewId,
      "notFound.classroom",
    );

    const result = await this.validateSessionAvailability({
      group,
      classroom,
      startTime,
      endTime,
    });

    if (!result.isValid) {
      throw new BadRequestError("invalid.session", result);
    }

    const sessionDoc = await this.sessionRepo.addOne({
      status: SESSION_STATUS_ENUM.WAITING,
      sessionType,
      startTime,
      endTime,
      teacher: group.teacher,
      classroom: classroom._id,
      group: group._id,
      class: null,
      classGroup: null,
      subjectType: null,
      subSubjectType: null,
      files: [],
      attendence: {},
      notes: [],
      sessionSummary: null,
      homeworkGiven: [],
      homeworkToDo: [],
      launchTime: null,
      closeTime: null,
      week: null,
      isClosedForced: false,
      reasonForCanceling: null,
      canceledBy: null,
      isTeacherPaid: false,
    });

    return { ...result, sessionId: sessionDoc._id };
  }
  private async validateSessionAvailability(data: {
    group: Group;
    classroom: Classroom;
    startTime: Date;
    endTime: Date;
  }): Promise<AddSessionForGroupResponse> {
    const { group, classroom, startTime, endTime } = data;

    const isClassroomAvailable = await this.sessionApplicationService.isClassroomAvailable({
      classroomId: classroom._id,
      startDate: startTime,
      endDate: endTime,
    });

    const isTeacherAvailable = await this.sessionApplicationService.isTeacherAvailable({
      teacherId: group.teacher,
      startDate: startTime,
      endDate: endTime,
    });

    const isGroupsAvailable = await this.sessionApplicationService.isGroupsAvailable({
      groupIds: [group._id],
      startDate: startTime,
      endDate: endTime,
    });

    const sessionEvaluationResult = SessionService.evaluateSessionRequirements(
      {
        isClassGroupAvailable: true,
        isClassAvailable: true,
        isTeacherAvailable,
        isClassroomAvailable,
        isGroupsAvailable,
      },
      this.language,
    );
    return { ...sessionEvaluationResult, sessionId: null };
  }
}
