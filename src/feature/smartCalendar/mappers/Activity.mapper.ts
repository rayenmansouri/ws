import { Populate } from "../../../core/populateTypes";
import { ClassTypeMetaData } from "../../classTypes/repo/classType.entity";
import { ActivityDTO } from "../dtos/Activity.dto";

export class ActivityMapper {
  static toActivityDTO(
    activity: Populate<
      ClassTypeMetaData,
      "activities.subjectType" | "activities.subSubjectType" | "activities.sessionType"
    >["activities"][0],
    index: number,
  ): ActivityDTO {
    return {
      index,
      durationInMinutes: activity.durationInMinutes,
      sessionType: {
        _id: activity.sessionType._id,
        newId: activity.sessionType.newId,
        name: activity.sessionType.name,
      },
      week: activity.week,
      perGroup: activity.perGroup,
      subjectType: {
        _id: activity.subjectType._id,
        newId: activity.subjectType.newId,
        name: activity.subjectType.name,
      },
      subSubjectType: activity.subSubjectType
        ? {
            _id: activity.subSubjectType._id,
            newId: activity.subSubjectType.newId,
            name: activity.subSubjectType.name,
          }
        : null,
    };
  }
}
