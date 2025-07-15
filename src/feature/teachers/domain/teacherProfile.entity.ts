import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Class } from "../../classes/domain/class.entity";
import { Group } from "../../groupManagement/domains/group.entity";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import { Teacher } from "./teacher.entity";

export type TeacherProfile = {
  teacher: ID;
  schoolYear: ID;
  classes: ID[];
  groups: ID[];
} & BaseEntity;

export type TeacherProfileMetaData = GenerateMetaData<
  TeacherProfile,
  {
    teacher: Teacher;
    schoolYear: SchoolYear;
    classes: Class[];
    groups: Group[];
  }
>;
