import { injectable } from "inversify";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { SCHEDULE_ENTITY_ENUM } from "../../../helpers/constants";
import { ID } from "../../../types/BaseEntity";
import { Role } from "../../authorization/domain/role.entity";
import { ObservationRepo } from "../../observations/domain/Observation.repo";
import { Parent } from "../../parents/domain/parent.entity";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { SessionRepo } from "../domain/Session.repo";
import { SessionService } from "../domain/Session.service";
import { TLanguageEnum } from "./../../../translation/constants";
import { translate } from "./../../../translation/helper/translate";
import {
  AttendanceTable,
  ObservationGivenTable,
  SessionCanceledTable,
} from "../../dashboards/dtos/AdminDashboard.dto";
import { UserMapper } from "./../../users/mappers/User.mapper";

export type AttendanceDashboardStats = {
  tabName: "attendance";
  chartData: { tag: string; percentage: number }[];
  tableData: AttendanceTable[];
};

export type ObservationDashboardStats = {
  tabName: "observationGiven";
  chartData: { tag: string; percentage: number }[];
  tableData: ObservationGivenTable[];
};

export type SessionCanceledDashboardStats = {
  tabName: "sessionCanceled";
  chartData: { tag: string; percentage: number }[];
  tableData: SessionCanceledTable[];
};

@injectable()
export class SessionApplicationService {
  constructor(
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
  ) {}

  async isUserAllowedToViewSession(
    userDetails: { user: Omit<BaseUser, "roles"> & { roles: Role[] }; type: TEndUserEnum },
    session: { class: ID | null; group: ID | null; teacher: ID | null },
    schoolYear: ID,
  ): Promise<boolean> {
    switch (userDetails.type) {
      case END_USER_ENUM.ADMIN:
        return SessionService.isAdminAllowedToViewSession();

      case END_USER_ENUM.STUDENT:
        const studentProfile = await this.studentProfileRepo.getStudentProfileOfSchoolYearOrThrow(
          userDetails.user._id,
          schoolYear,
        );
        return SessionService.isStudentAllowedToViewSession(studentProfile, session);

      case END_USER_ENUM.TEACHER:
        return SessionService.isSessionBelongingToTeacher(userDetails.user._id, session);

      case END_USER_ENUM.PARENT:
        const parent = userDetails.user as unknown as Parent;
        const studentProfiles = await this.studentProfileRepo.getManyStudentProfilesOfSchoolYear(
          parent.students,
          schoolYear,
        );
        return SessionService.isParentAllowedToViewSession(studentProfiles, session);

      default:
        return false;
    }
  }

  async isTeacherAvailable(data: {
    teacherId: ID;
    startDate: Date;
    endDate: Date;
    excludeSessionIds?: ID[];
  }): Promise<boolean> {
    const sessions = await this.sessionRepo.findOverlappingSessionsByRangeAndEntity(
      SCHEDULE_ENTITY_ENUM.TEACHER,
      [data.teacherId],
      data,
    );

    const excludeSessionIds = data.excludeSessionIds || [];
    const filteredSessions = sessions.filter(session => !excludeSessionIds.includes(session._id));

    if (filteredSessions.length > 0) return false;
    return true;
  }

  async isClassroomAvailable(data: {
    classroomId: ID;
    startDate: Date;
    endDate: Date;
    excludeSessionIds?: ID[];
  }): Promise<boolean> {
    const sessions = await this.sessionRepo.findOverlappingSessionsByRangeAndEntity(
      SCHEDULE_ENTITY_ENUM.CLASSROOM,
      [data.classroomId],
      data,
    );
    const excludeSessionIds = data.excludeSessionIds || [];
    const filteredSessions = sessions.filter(session => !excludeSessionIds.includes(session._id));

    if (filteredSessions.length > 0) return false;
    return true;
  }

  async isClassAvailable(data: {
    classIds: ID[];
    startDate: Date;
    endDate: Date;
    excludeSessionIds?: ID[];
  }): Promise<boolean> {
    const sessions = await this.sessionRepo.findOverlappingSessionsByRangeAndEntity(
      SCHEDULE_ENTITY_ENUM.CLASS,
      data.classIds,
      data,
    );
    const excludeSessionIds = data.excludeSessionIds || [];
    const filteredSessions = sessions.filter(session => !excludeSessionIds.includes(session._id));
    if (filteredSessions.length > 0) return false;
    return true;
  }

  async isClassGroupAvailable(data: {
    classGroupId: ID;
    startDate: Date;
    endDate: Date;
    excludeSessionIds?: ID[];
  }): Promise<boolean> {
    const sessions = await this.sessionRepo.findOverlappingSessionsByRangeAndEntity(
      SCHEDULE_ENTITY_ENUM.CLASS_GROUP,
      [data.classGroupId],
      data,
    );

    const excludeSessionIds = data.excludeSessionIds || [];
    const filteredSessions = sessions.filter(session => !excludeSessionIds.includes(session._id));
    if (filteredSessions.length > 0) return false;
    return true;
  }

  async isGroupsAvailable(data: {
    groupIds: ID[];
    startDate: Date;
    endDate: Date;
    excludeSessionIds?: ID[];
  }): Promise<boolean> {
    const sessions = await this.sessionRepo.findOverlappingSessionsByRangeAndEntity(
      SCHEDULE_ENTITY_ENUM.GROUP,
      data.groupIds,
      data,
    );

    const excludeSessionIds = data.excludeSessionIds || [];
    const filteredSessions = sessions.filter(session => !excludeSessionIds.includes(session._id));
    if (filteredSessions.length > 0) return false;
    return true;
  }

  async getDashboardAttendanceStats(
    filter: {
      classIds?: ID[];
      groupIds?: ID[];
      dateInterval: {
        from: Date;
        to: Date;
      };
      studentId?: ID;
    },
    language: TLanguageEnum,
  ): Promise<AttendanceDashboardStats> {
    const attendanceTableResponse: AttendanceDashboardStats = {
      tabName: "attendance",
      chartData: [],
      tableData: [],
    };

    const chartDataPromise = this.sessionRepo.getAttendanceStats(filter);

    const tableDataPromise = this.sessionRepo.getLatestAttendance(filter);

    const [chartData, tableData] = await Promise.all([chartDataPromise, tableDataPromise]);

    attendanceTableResponse.chartData = chartData.map(data => {
      return {
        ...data,
        tag: translate(`attendanceStatues.${data.tag}`, language)!,
      };
    });

    attendanceTableResponse.tableData = tableData.map(data => {
      return {
        ...data,
        student: undefined,
        studentFullName: data.student ? UserMapper.toUserProfileDTO(data.student).fullName : null,
        studentAvatar: data.student ? UserMapper.toUserProfileDTO(data.student).avatar : null,
        status: translate(`attendanceStatues.${data.status}`, language)!,
      };
    });
    return attendanceTableResponse;
  }

  async getDashboardObservationStats(
    classesIds: ID[],
    language: TLanguageEnum,
    dateInterval?: {
      from?: Date;
      to?: Date;
    },
  ): Promise<ObservationDashboardStats> {
    const punishmentTableResponse: ObservationDashboardStats = {
      tabName: "observationGiven",
      chartData: [],
      tableData: [],
    };

    const chartDataPromise = this.observationRepo.getObservationsUrgencyStatsOfClasses(
      classesIds,
      dateInterval,
    );
    const tableDataPromise = this.observationRepo.getObservationsByClassInRange(
      classesIds,
      dateInterval,
    );

    const [chartData, tableData] = await Promise.all([chartDataPromise, tableDataPromise]);

    punishmentTableResponse.tableData = tableData.map(data => {
      const issuerDto = data.issuer ? UserMapper.toUserProfileDTO(data.issuer) : null;
      return {
        _id: data._id,
        newId: data.newId,
        reason: data.reason,
        students: data.students.map(student => UserMapper.toUserProfileDTO(student)),
        issuerFullName: issuerDto?.fullName || null,
        issuerAvatar: issuerDto?.avatar || null,
        urgency: translate(`urgencies.${data.urgency}`, language)!,
      };
    });
    punishmentTableResponse.chartData = chartData.map(data => {
      return { ...data, tag: translate(`urgencies.${data.tag}`, language)! };
    });

    return punishmentTableResponse;
  }

  async getDashboardSessionCanceledStats(
    classesIds: ID[],
    dateInterval?: {
      from?: Date;
      to?: Date;
    },
  ): Promise<SessionCanceledDashboardStats> {
    const SessionCanceledTableResponse: SessionCanceledDashboardStats = {
      tabName: "sessionCanceled",
      chartData: [],
      tableData: [],
    };

    const chartDataPromise = this.sessionRepo.getSessionCanceledStats(classesIds, dateInterval);

    const tableDataPromise = this.sessionRepo.listCanceledSession(classesIds, dateInterval);

    const [chartData, tableData] = await Promise.all([chartDataPromise, tableDataPromise]);

    SessionCanceledTableResponse.tableData = tableData.map(data => {
      return {
        ...data,
        teacher: undefined,
        teacherFullName: data.teacher ? UserMapper.toUserProfileDTO(data.teacher).fullName : null,
        teacherAvatar: data.teacher ? UserMapper.toUserProfileDTO(data.teacher).avatar : null,
      };
    });
    SessionCanceledTableResponse.chartData = chartData;

    return SessionCanceledTableResponse;
  }
}
