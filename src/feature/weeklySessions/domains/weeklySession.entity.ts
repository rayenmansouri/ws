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

export type WeeklySessionDate = {
  day: number;
  timeStamps: number;
};

export type WeeklySession = {
  sessionType: ID;
  subjectType: ID | null;
  subSubjectType: ID | null;
  startTime: WeeklySessionDate;
  endTime: WeeklySessionDate;
  group: ID | null;
  teacher: ID;
  class: ID | null;
  classroom: ID;
  classGroup: ID | null;
  week: "A" | "B" | null;
  isDraft: boolean;
} & BaseEntity;

export type WeeklySessionMetaData = GenerateMetaData<
  WeeklySession,
  {
    sessionType: SessionType;
    subjectType: SubjectType;
    subSubjectType: SubSubjectType;
    classGroup: ClassGroup;
    classroom: Classroom;
    group: Group;
    class: Class;
    teacher: Teacher;
  }
>;
