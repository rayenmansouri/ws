import { Populate } from "../../../core/populateTypes";
import { UserMapper } from "../../users/mappers/User.mapper";
import { WeeklySessionDTO } from "../../weeklySessions/dto/weeklySession.dto";
import { SmartCalendarSessionMetaData } from "../domain/smartCalendarSession.entity";

export class SmartCalendarSessionMapper {
  static toWeeklySessionDTO(
    session: Populate<
      SmartCalendarSessionMetaData,
      | "class"
      | "teacher"
      | "classroom"
      | "sessionType"
      | "classGroup"
      | "subSubjectType"
      | "subjectType"
    >,
  ): WeeklySessionDTO {
    return {
      _id: session._id,
      newId: session.newId,
      class: session.class
        ? {
            _id: session.class._id,
            name: session.class.name,
            newId: session.class.newId,
          }
        : null,
      classroom: {
        _id: session.classroom._id,
        name: session.classroom.name,
        newId: session.classroom.newId,
      },
      sessionType: {
        _id: session.sessionType._id,
        name: session.sessionType.name,
        newId: session.sessionType.newId,
      },
      group: session.classGroup
        ? {
            _id: session.classGroup._id,
            name: session.classGroup.name,
            newId: session.classGroup.newId,
          }
        : null,
      topic: session.subjectType
        ? {
            _id: session.subjectType._id,
            name: session.subjectType.name,
            newId: session.subjectType.newId,
          }
        : {
            _id: session.subSubjectType!._id,
            name: session.subSubjectType!.name,
            newId: session.subSubjectType!.newId,
          },
      teacher: UserMapper.toUserProfileDTO(session.teacher),
      startDate: {
        day: session.startTime.day,
        hours: Math.floor(session.startTime.timeStamps / 60),
        minutes: session.startTime.timeStamps % 60,
      },
      endDate: {
        day: session.endTime.day,
        hours: Math.floor(session.endTime.timeStamps / 60),
        minutes: session.endTime.timeStamps % 60,
      },
      week: session.week,
    };
  }
}
