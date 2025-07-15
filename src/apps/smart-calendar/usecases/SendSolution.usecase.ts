import axios from "axios";
import { TOPIC_TYPE_ENUM } from "../../../feature/examGrade/domain/tunisian/ExamGrade.entity";
import { WeeklySessionDate } from "../../../feature/weeklySessions/domains/weeklySession.entity";
import { CommentOfActivity } from "../FetFileGenerator";
import { FetProcess } from "../FetProcess";
import { internalBaseUrl } from "../../../config";
import { MINUTES_IN_HOUR } from "../../../helpers/constants";

export type SmartCalendarActivity = {
  class: string;
  sessionType: string;
  subjectType: string | null;
  subSubjectType: string | null;
  teacher: string;
  week: "A" | "B" | null;
  classGroup: "1" | "2" | null;
  startTime: WeeklySessionDate;
  endTime: WeeklySessionDate;
  classroom: string;
};

export class SendSolutionUsecase {
  constructor() {}

  static async execute(fetProcess: FetProcess): Promise<void> {
    const fetActivities = await fetProcess.readResults();

    const activities: SmartCalendarActivity[] = [];

    let index = 0;
    while (index < fetActivities.length) {
      const fetActivity = fetActivities[index];
      const activityDetails = JSON.parse(fetActivity.Comments) as CommentOfActivity;

      activities.push({
        class: activityDetails.class,
        sessionType: fetActivity["Activity Tags"],
        subjectType:
          activityDetails.topicType === TOPIC_TYPE_ENUM.SUBJECT_TYPE
            ? activityDetails.topicId
            : null,
        subSubjectType:
          activityDetails.topicType === TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE
            ? activityDetails.topicId
            : null,
        teacher: activityDetails.teacher,
        week: activityDetails.week ?? null,
        classGroup: activityDetails.group ?? null,
        startTime: {
          day: +fetActivity.Day,
          timeStamps: +fetActivity.Hour * MINUTES_IN_HOUR,
        },
        endTime: {
          day: +fetActivity.Day,
          timeStamps:
            +fetActivity.Hour * MINUTES_IN_HOUR +
            activityDetails.duration *
              fetProcess.config.globalSchoolConfig.numberOfSlotsInOneHour *
              MINUTES_IN_HOUR,
        },
        classroom: fetActivity.Room,
      });
      index += activityDetails.duration;
    }

    await axios.post(
      `${internalBaseUrl}/schedules/${fetProcess.scheduleId}/complete?JSON={"schoolSubdomain":"${fetProcess.config.schoolSubdomain}"}`,
      {
        activities,
      },
    );
  }
}
