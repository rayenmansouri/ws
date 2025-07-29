import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { FileMapper } from "../../../core/fileManager/file.mapper";
import { Populate } from "../../../core/populateTypes";
import { Role } from "../../authorization/domain/role.entity";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { Parent } from "../../parents/domain/parent.entity";
import { Student } from "../../students/domain/student.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { UserMapper } from "../../users/mappers/User.mapper";
import { IAttendance, SessionMetaData, TAttendanceEnum } from "../domain/session.entity";
import { SessionService } from "../domain/Session.service";
import { SessionDTO } from "../dtos/Session.dto";
import { SessionAttendanceDTO } from "../dtos/sessionAttendance.dto";
import { ID } from "./../../../types/BaseEntity";
import { SessionDetailsDTO } from "./../dtos/sessionDetails.dto";

type ToSessionDetailsDTOParams = {
  session: Populate<
    SessionMetaData,
    "teacher" | "classGroup" | "classroom" | "class" | "group" | "subjectType" | "subSubjectType"
  >;
  sessionAttendance: SessionAttendanceDTO;
  currentTimeOfSchool: Date;
};

export class SessionMapper {
  static toSessionDetailsDTO({
    session,
    currentTimeOfSchool,
    sessionAttendance,
  }: ToSessionDetailsDTOParams): SessionDetailsDTO {
    return {
      _id: session._id,
      newId: session.newId,
      status: session.status,
      reasonForCanceling: session.reasonForCanceling,
      isAttendanceConfirmationAllowed: SessionService.isAttendanceConfirmationAllowed(
        session,
        currentTimeOfSchool,
      ),
      startTime: session.startTime,
      endTime: session.endTime,
      sessionType: EntityMapper.toEntityDto(session.sessionType),
      week: session.week,
      classGroup: session.classGroup ? EntityMapper.toEntityDto(session.classGroup) : null,
      classroom: EntityMapper.toEntityDto(session.classroom),
      class: session.class
        ? EntityMapper.toEntityDto(session.class)
        : session.group
        ? EntityMapper.toEntityDto(session.group)
        : null,
      group: session.group
        ? EntityMapper.toEntityDto({ ...session.group, name: session.group.groupType.name })
        : null,
      subjectType: session.subjectType ? EntityMapper.toEntityDto(session.subjectType) : null,
      subSubjectType: session.subSubjectType
        ? EntityMapper.toEntityDto(session.subSubjectType)
        : null,
      teacher: session.teacher ? UserMapper.toUserProfileDTO(session.teacher) : null,
      sessionSummary: session.sessionSummary,
      files: session.files.map(FileMapper.toFileDTO),
      notes: session.notes.map((note, index) => ({
        title: note.title,
        text: note.text,
        index,
      })),
      sessionAttendance,
      attendanceStats: SessionService.getAttendanceStats(session),
      launchedAt: session.launchTime,
    };
  }

  static toSessionAttendanceDTO(
    students: Student[],
    session: { attendence: IAttendance },
    userDetails: {
      user: Omit<BaseUser, "roles"> & { roles: Role[] };
      type: TEndUserEnum;
    },
    previousAttendances: Record<ID, TAttendanceEnum | null> | null,
  ): SessionAttendanceDTO {
    let filteredStudents = students;

    if (userDetails.type === END_USER_ENUM.STUDENT)
      filteredStudents = students.filter(student => student._id === userDetails.user._id);

    if (userDetails.type === END_USER_ENUM.PARENT) {
      const parent = userDetails.user as unknown as Parent;
      filteredStudents = students.filter(student => parent.students.includes(student._id));
    }

    return filteredStudents.map(student => {
      return {
        student: UserMapper.toUserProfileDTO(student),
        attendance: session.attendence[student._id] || null,
        previousAttendance: previousAttendances ? previousAttendances[student._id] : null,
      };
    });
  }
  static toSessionDTO(
    session: Populate<
      SessionMetaData,
      "subjectType" | "subSubjectType" | "group" | "classroom" | "class" | "classGroup"
    > & { attendance: TAttendanceEnum | null },
  ): SessionDTO {
    const classGroup = session.classGroup ? EntityMapper.toEntityDto(session.classGroup) : null;

    return {
      _id: session._id,
      newId: session.newId,
      status: session.status,
      topicName: (session.subjectType?.name ||
        session.subSubjectType?.name ||
        session.group?.name)!,
      topicNewId: (session.subjectType?.newId ||
        session.subSubjectType?.newId ||
        session.group?.newId)!,
      className: (session.class?.name || session.group?.name)!,
      classroom: EntityMapper.toEntityDto(session.classroom),
      startTime: session.startTime,
      endTime: session.endTime,
      classGroup: classGroup,
      attendence: session.attendance,
      sessionType: EntityMapper.toEntityDto(session.sessionType),
    };
  }
}
