import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { Level } from "../../levels/domains/level.entity";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import { Student } from "../../students/domain/student.entity";
import { Teacher } from "../../teachers/domain/teacher.entity";
import { GroupType } from "./groupType.entity";

export type Group = {
  name: string;
  groupType: GroupType;
  teacher: ID;
  students: ID[];
  schoolYears: ID[];
  classTypes: ID[];
  levels: ID[];
} & BaseEntity;

export type GroupMetaData = GenerateMetaData<
  Group,
  {
    students: Student[];
    schoolYears: SchoolYear[];
    classTypes: ClassType[];
    teacher: Teacher;
    levels: Level[];
  }
>;
