import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Class } from "../../classes/domain/class.entity";
import { ClassGroup } from "../../classes/domain/classGroup.entity";
import { Classroom } from "../../classrooms/domains/classroom.entity";
import { Group } from "../../groupManagement/domains/group.entity";
import { SessionType } from "../../sessionTypes/domains/sessionType.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";
import { SubSubjectType } from "../../subSubjectTypes/domains/subSubjectType.entity";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { WeeklySessionDate } from "../../weeklySessions/domains/weeklySession.entity";
import { SmartCalendarSchedule } from "./smartCalendarSchedule.entity";

export type SmartCalendarSession = {
  smartCalendarSchedule: ID;
  class: ID | null;
  group: ID | null;
  sessionType: ID;
  subjectType: ID | null;
  subSubjectType: ID | null;
  teacher: ID;
  week: "A" | "B" | null;
  classGroup: ID | null;
  startTime: WeeklySessionDate;
  endTime: WeeklySessionDate;
  classroom: ID;
} & BaseEntity;

export type SmartCalendarSessionMetaData = GenerateMetaData<
  SmartCalendarSession,
  {
    class: Class;
    classGroup: ClassGroup;
    sessionType: SessionType;
    subjectType: SubjectType;
    subSubjectType: SubSubjectType;
    teacher: Teacher;
    smartCalendarSchedule: SmartCalendarSchedule;
    group: Group;
    classroom: Classroom;
  }
>;
