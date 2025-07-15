import { injectable } from "inversify";
import moment from "moment";
import { BadRequestError, InternalError } from "../../../core/ApplicationErrors";
import {
  ATTENDANCE_ENUM,
  TAttendanceEnum,
  TSessionStatusEnum,
} from "../../../database/schema/pedagogy/session/session.schema";
import { ID } from "../../../types/BaseEntity";
import { ClassGroup } from "../../classes/domain/classGroup.entity";
import { Group } from "../../groupManagement/domains/group.entity";
import { StudentProfile } from "../../students/domain/studentProfile.entity";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { schoolDocStore } from "./../../../core/subdomainStore";
import { SESSION_STATUS_ENUM } from "./../../../database/schema/pedagogy/session/session.schema";
import { MINUTES_TO_MILLISECOND } from "./../../../helpers/constants";
import { Class } from "./../../classes/domain/class.entity";
import { SubSubjectType } from "./../../subSubjectTypes/domains/subSubjectType.entity";
import { SubjectType } from "./../../subjectTypes/domains/subjectType.entity";
import { CONFIRMATION_ATTENDANCE_DELAY_IN_MINUTES } from "./../constants/session.constants";
import { IAttendance, Session } from "./session.entity";
import { translate } from "../../../translation/helper/translate";
import { TLanguageEnum } from "../../../translation/constants";

export type SessionAttendanceStats = {
  present: {
    percentage: string;
    count: number;
  };
  absent: {
    percentage: string;
    count: number;
  };
  late: {
    percentage: string;
    count: number;
  };
  expelled: {
    percentage: string;
    count: number;
  };
};

@injectable()
export class SessionService {
  constructor() {}

  static isAttendanceConfirmationAllowed(
    session: { status: TSessionStatusEnum; endTime: Date },
    currentTimeOfSchool: Date,
  ): boolean {
    switch (session.status) {
      case "waiting":
        return false;
      case "inProgress":
        return true;
      case "completed":
        const sessionEndTimeInMs = session.endTime.getTime();
        const currentTimeOfSchoolInMs = currentTimeOfSchool.getTime();
        return (
          sessionEndTimeInMs + CONFIRMATION_ATTENDANCE_DELAY_IN_MINUTES > currentTimeOfSchoolInMs
        );
      case "canceled":
        return false;
    }
  }

  static getAttendanceStats(session: { attendence: IAttendance }): SessionAttendanceStats {
    const attendanceStats = {
      present: { percentage: "0", count: 0 },
      absent: { percentage: "0", count: 0 },
      late: { percentage: "0", count: 0 },
      expelled: { percentage: "0", count: 0 },
    };

    for (const studentId in session.attendence) {
      switch (session.attendence[studentId]) {
        case "present":
          attendanceStats.present.count++;
          break;
        case "absent":
          attendanceStats.absent.count++;
          break;
        case "late":
          attendanceStats.late.count++;
          break;
        case "expelled":
          attendanceStats.expelled.count++;
          break;
      }
    }

    const totalStudents = Object?.keys(session?.attendence)?.length || 0;

    if (totalStudents === 0) return attendanceStats;

    attendanceStats.present.percentage = (
      (attendanceStats.present.count / totalStudents) *
      100
    ).toFixed(2);
    attendanceStats.absent.percentage = (
      (attendanceStats.absent.count / totalStudents) *
      100
    ).toFixed(2);
    attendanceStats.late.percentage = ((attendanceStats.late.count / totalStudents) * 100).toFixed(
      2,
    );
    attendanceStats.expelled.percentage = (
      (attendanceStats.expelled.count / totalStudents) *
      100
    ).toFixed(2);

    return attendanceStats;
  }

  static isAdminAllowedToViewSession(): boolean {
    return true;
  }

  static isSessionBelongingToTeacher(teacherId: ID, session: { teacher: ID | null }): boolean {
    if (session.teacher === teacherId) return true;

    return false;
  }

  static isStudentAllowedToViewSession(
    studentProfile: StudentProfile,
    session: { class: ID | null; group: ID | null },
  ): boolean {
    if (session.class === studentProfile.class) return true;

    if (session.group && studentProfile.groups.includes(session.group)) return true;

    return false;
  }

  static isParentAllowedToViewSession(
    childrenProfiles: StudentProfile[],
    session: { class: ID | null; group: ID | null },
  ): boolean {
    for (const childProfile of childrenProfiles) {
      if (session.class === childProfile.class) return true;

      if (session.group && childProfile.groups.includes(session.group)) return true;
    }

    return false;
  }

  static extractTopicName(
    subjectType: SubjectType | null,
    subSubjectType: SubSubjectType | null,
    group: Group | null,
  ): string {
    let topicName: string | null = null;
    if (subjectType) topicName = subjectType.name;
    if (subSubjectType) topicName = subSubjectType.name;
    if (group) topicName = group.groupType.name;
    if (!topicName) throw new InternalError("global.topicNameMustBeSet");

    return topicName;
  }

  static ensureSessionCanBeTerminated(
    sessionEndTime: Date,
    tenantId: string,
    sessionStatus: TSessionStatusEnum,
  ): void {
    if (sessionStatus === "completed") throw new BadRequestError("session.sessionAlreadyClosed");

    if (sessionStatus !== "inProgress")
      throw new BadRequestError("session.sessionMustBeInProgress");

    if (sessionEndTime > getCurrentTimeOfSchool(tenantId))
      throw new BadRequestError("session.enableToTerminateSessionBeforeItEnd");
  }

  static ensureAttendanceConfirmationStillAllowed(
    sessionEndTime: Date,
    sessionStatus: TSessionStatusEnum,
    currentTime: Date,
  ): void {
    const confirmationDelayInMs = moment
      .duration(CONFIRMATION_ATTENDANCE_DELAY_IN_MINUTES, "minute")
      .asMilliseconds();

    const sessionEndTimeInMs = sessionEndTime.getTime();
    const currentTimeOfSchoolInMs = currentTime.getTime();

    const isConfirmationDeadlineReached =
      sessionEndTimeInMs + confirmationDelayInMs > currentTimeOfSchoolInMs;

    const isConfirmationTimeStillActive =
      sessionStatus === SESSION_STATUS_ENUM.COMPLETED && isConfirmationDeadlineReached;

    const isAttendanceConfirmationAllowed =
      sessionStatus === SESSION_STATUS_ENUM.IN_PROGRESS || isConfirmationTimeStillActive;

    if (!isAttendanceConfirmationAllowed) {
      throw new BadRequestError("session.sessionTimePassedForConfirmationAttendance");
    }
  }

  static ensureStudentBelongsToSession(
    session: { studentsOfClassIds: ID[] | null; studentsOfGroupIds: ID[] | null },
    studentId: ID,
  ): void {
    if (session.studentsOfClassIds) {
      if (!session.studentsOfClassIds.includes(studentId)) {
        throw new BadRequestError("studentRules.studentNotAssignedToClass");
      }
    }

    if (session.studentsOfGroupIds) {
      if (!session.studentsOfGroupIds.includes(studentId)) {
        throw new BadRequestError("studentRules.studentNotAssignedToGroup");
      }
    }
  }

  static ensureSessionCanBeStarted(
    session: {
      teacher: ID | null;
      isTeacherPaid: boolean;
      status: TSessionStatusEnum;
      startTime: Date;
      endTime: Date;
    },
    user: { type: "teacher" | "admin"; id: ID },
    tenantId: string,
    inProgressSessionOfTeacher: Session | null,
  ): void {
    if (session.isTeacherPaid) throw new BadRequestError("session.sessionIsAlreadyPaid");
    if (
      session.status === SESSION_STATUS_ENUM.WAITING ||
      session.status === SESSION_STATUS_ENUM.IN_PROGRESS
    ) {
      if (
        user.type === "teacher" &&
        !this.isSessionBelongingToTeacher(user.id, { teacher: session.teacher })
      )
        throw new BadRequestError("session.sessionDoesNotBelongsToThisTeacher");

      if (inProgressSessionOfTeacher)
        throw new BadRequestError("session.teacherHasAlreadyStartedSession");

      const minimumSessionLaunchTime =
        session.startTime.getTime() -
        schoolDocStore[tenantId].openSessionAdvanceInMin * MINUTES_TO_MILLISECOND;

      if (minimumSessionLaunchTime > getCurrentTimeOfSchool(tenantId).getTime())
        throw new BadRequestError(
          "session.youCanOnlyStartThisSessionAfterTheMinimumSessionLaunchTime",
        );

      const maximumSessionLaunchTime =
        session.endTime.getTime() +
        schoolDocStore[tenantId].openSessionDelayInMin * MINUTES_TO_MILLISECOND;

      if (maximumSessionLaunchTime < getCurrentTimeOfSchool(tenantId).getTime())
        throw new BadRequestError("session.sessionCannotBeLaunched");
    }
  }

  static extractStudentIdsFromSession(
    classDoc: Class | null,
    classGroup: ClassGroup | null,
    group: Group | null,
  ): ID[] {
    if (classDoc && !classGroup) {
      return classDoc.students;
    } else if (classDoc && classGroup) {
      return classGroup.students;
    } else if (group) {
      return group.students;
    } else {
      throw new InternalError("session.sessionMustBelongToAClassOrAGroupOrClassGroup");
    }
  }

  static ensureSessionStatusCanBeUpdated(
    session: {
      status: TSessionStatusEnum;
      isTeacherPaid: boolean;
      startTime: Date;
      endTime: Date;
    },
    newStatus: TSessionStatusEnum,
    tenantId: string,
  ): void {
    if (session.isTeacherPaid) throw new BadRequestError("session.sessionIsAlreadyPaid");

    if (newStatus === "waiting") {
      if (session.status === "canceled") {
        if (session.startTime.getTime() <= getCurrentTimeOfSchool(tenantId).getTime())
          throw new BadRequestError("session.sessionStatusCannotBeUpdateItToPending");
      } else throw new BadRequestError("session.canceledSessionCanOnlyBeUpdatedToPending");
    }

    if (
      newStatus === "completed" &&
      session.endTime.getTime() >= getCurrentTimeOfSchool(tenantId).getTime()
    ) {
      throw new BadRequestError("session.youCanOnlyCloseThisSessionBeforeEndTime");
    }

    if (newStatus === "inProgress")
      if (session.status === "completed")
        throw new BadRequestError("session.cannotChangeStatusFromCompletedToPending");
  }

  static generateInitialAttendance(
    studentIds: ID[],
    attendanceStatus: TAttendanceEnum,
  ): Record<ID, TAttendanceEnum> {
    return studentIds.reduce((acc: Record<ID, TAttendanceEnum>, id: ID) => {
      acc[id] = attendanceStatus;
      return acc;
    }, {});
  }

  static isSessionNotesChanged(
    oldNotes: { title: string; text: string }[],
    newNotes: { title: string; text: string }[],
  ): boolean {
    const addedNotes = newNotes.filter(
      newNote => !oldNotes.some(oldNote => oldNote.title === newNote.title),
    );
    const removedNotes = oldNotes.filter(
      oldNote => !newNotes.some(newNote => newNote.title === oldNote.title),
    );
    const modifiedNotes = newNotes.filter(newNote => {
      const oldNote = oldNotes.find(note => note.title === newNote.title);
      return oldNote && oldNote.text !== newNote.text;
    });

    return addedNotes.length > 0 || removedNotes.length > 0 || modifiedNotes.length > 0;
  }

  static getTeacherAttendance(session: Pick<Session, "status">): TAttendanceEnum | null {
    const { status } = session;
    if (status === SESSION_STATUS_ENUM.COMPLETED || status === SESSION_STATUS_ENUM.IN_PROGRESS) {
      return ATTENDANCE_ENUM.PRESENT;
    }
    if (status === SESSION_STATUS_ENUM.CANCELED) {
      return ATTENDANCE_ENUM.ABSENT;
    }
    return null;
  }

  static ensureSessionRangeValid(
    data: { startTime: Date; endTime: Date },
    currentTimeOfSchool: Date,
  ): void {
    const { startTime, endTime } = data;

    if (moment(startTime).isAfter(moment(endTime))) {
      throw new BadRequestError("session.sessionCannotBeInThePass");
    }

    if (moment(startTime).isBefore(moment(currentTimeOfSchool))) {
      throw new BadRequestError("session.sessionCannotBeInThePass");
    }
  }

  static evaluateSessionRequirements(
    data: {
      isClassAvailable: boolean;
      isClassGroupAvailable: boolean;
      isTeacherAvailable: boolean;
      isClassroomAvailable: boolean;
      isGroupsAvailable: boolean;
    },
    language: TLanguageEnum,
  ): {
    isValid: boolean;
    errors: {
      teacher: string | null;
      classroom: string | null;
      class: string | null;
      classGroup: string | null;
      group: string | null;
    };
  } {
    const {
      isClassAvailable,
      isClassGroupAvailable,
      isTeacherAvailable,
      isClassroomAvailable,
      isGroupsAvailable,
    } = data;
    if (
      isClassAvailable &&
      isClassGroupAvailable &&
      isTeacherAvailable &&
      isClassroomAvailable &&
      isGroupsAvailable
    ) {
      return {
        isValid: true,
        errors: { teacher: null, classroom: null, class: null, classGroup: null, group: null },
      };
    }
    const customSessionMessage = {
      classroom: translate("session.classroomNotAvailable", language)!,
      class: translate("session.classNotAvailable", language)!,
      classGroup: translate("session.classGroupNotAvailable", language)!,
      teacher: translate("session.teacherNotAvailable", language)!,
      group: translate("session.groupNotAvailable", language)!,
    };

    return {
      isValid: false,
      errors: {
        teacher: isTeacherAvailable ? null : customSessionMessage.teacher,
        classroom: isClassroomAvailable ? null : customSessionMessage.classroom,
        class: isClassAvailable ? null : customSessionMessage.class,
        classGroup: isClassGroupAvailable ? null : customSessionMessage.classGroup,
        group: isGroupsAvailable ? null : customSessionMessage.group,
      },
    };
  }
}
