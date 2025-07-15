import { Populate } from "../../../core/populateTypes";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { UserMapper } from "../../users/mappers/User.mapper";
import { WeeklySessionDTO } from "../dto/weeklySession.dto";
import { WeeklySessionMetaData } from "../domains/weeklySession.entity";

export class WeeklySessionMapper {
  static toWeeklySessionDto(
    weeklySession: Populate<
      WeeklySessionMetaData,
      | "class"
      | "classroom"
      | "classGroup"
      | "subjectType"
      | "subSubjectType"
      | "group"
      | "sessionType"
      | "teacher"
    >,
  ): WeeklySessionDTO {
    const topic = weeklySession.subjectType || weeklySession.subSubjectType || weeklySession.group;

    return {
      _id: weeklySession._id,
      newId: weeklySession.newId,
      week: weeklySession.week || null,
      startDate: {
        day: weeklySession.startTime.day,
        hours: Math.floor(weeklySession.startTime.timeStamps / 60),
        minutes: weeklySession.startTime.timeStamps % 60,
      },
      endDate: {
        day: weeklySession.endTime.day,
        hours: Math.floor(weeklySession.endTime.timeStamps / 60),
        minutes: weeklySession.endTime.timeStamps % 60,
      },
      topic: EntityMapper.toEntityDto(topic!),
      classroom: EntityMapper.toEntityDto(weeklySession.classroom),
      group: weeklySession.classGroup ? EntityMapper.toEntityDto(weeklySession.classGroup) : null,
      sessionType: EntityMapper.toEntityDto(weeklySession.sessionType),
      class: weeklySession.class
        ? EntityMapper.toEntityDto(weeklySession.class)
        : EntityMapper.toEntityDto(weeklySession.group!),

      teacher: (weeklySession.teacher as Teacher | null)
        ? UserMapper.toUserProfileDTO(weeklySession.teacher)
        : null,
    };
  }
}
