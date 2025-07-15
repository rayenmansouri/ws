import { GenerateMetaData } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { Role } from "../../authorization/domain/role.entity";
import { Classroom } from "../../classrooms/domains/classroom.entity";
import { Level } from "../../levels/domains/level.entity";
import { GroupType } from "../../groupManagement/domains/groupType.entity";
import { SubjectType } from "../../subjectTypes/domains/subjectType.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export type Teacher = {
  subjectTypes: ID[];
  groupTypes: ID[];
  levels: ID[];
  notAvailableTimes: { day: number; hours: number[] }[];
  maxDaysPerWeek: number | null;
  maxGapsPerDay: number | null;
  maxHoursPerDay: number | null;
  preferredClassroom: ID | null;
} & BaseUser;

export type TeacherMetaData = GenerateMetaData<
  Teacher,
  {
    preferredClassroom: Classroom;
    levels: Level[];
    groupTypes: GroupType[];
    subjectTypes: SubjectType[];
    roles: Role[];
  }
>;
