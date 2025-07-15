import { InternalError } from "../../../core/ApplicationErrors";
import { Populate } from "../../../core/populateTypes";
import { Level } from "../../levels/domains/level.entity";
import { SessionMetaData } from "../../sessionManagement/domain/session.entity";
import { SessionService } from "../../sessionManagement/domain/Session.service";
import { GENDER_ENUM } from "../../users/domain/baseUser.entity";
import { UserMapper } from "../../users/mappers/User.mapper";
import { ClassMetaData } from "../domain/class.entity";
import {
  ClassOverviewDashboardDTO,
  CurrentSessionClassDashboardDTO,
} from "../dto/ClassDashboard.dto";

export class ClassDashboardMapper {
  static toClassOverviewDto(data: {
    classDoc: Populate<ClassMetaData, "students" | "classType">;
    level: Pick<Level, "name">;
  }): ClassOverviewDashboardDTO {
    const { classDoc } = data;
    const femalesCount = classDoc.students.filter(
      student => student.gender === GENDER_ENUM.FEMALE,
    ).length;
    const malesCount = classDoc.students.filter(
      student => student.gender === GENDER_ENUM.MALE,
    ).length;
    return {
      _id: classDoc._id,
      newId: classDoc.newId,
      className: classDoc.name,
      malesCount: malesCount,
      femalesCount: femalesCount,
      studentsCount: classDoc.students.length,
      capacity: classDoc.classType.capacity,
      level: data.level.name,
    };
  }

  static toCurrentSessionDto(
    session: Populate<SessionMetaData, "subSubjectType" | "subjectType" | "teacher" | "classroom">,
  ): CurrentSessionClassDashboardDTO {
    const subjectName = session.subjectType?.name || session.subSubjectType?.name;
    if (!subjectName) throw new InternalError("Subject name is not defined");

    return {
      id: session._id,
      newId: session.newId,
      subject: subjectName,
      teacher: session.teacher ? UserMapper.toUserProfileDTO(session.teacher) : null,
      sessionType: session.sessionType.name,
      classroom: session.classroom.name,
      attendanceStat: SessionService.getAttendanceStats(session),
    };
  }
  toAttendanceStatsDto() {}
}
