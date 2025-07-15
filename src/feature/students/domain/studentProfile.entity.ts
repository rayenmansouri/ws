import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Class } from "../../classes/domain/class.entity";
import { ClassGroup } from "../../classes/domain/classGroup.entity";
import { Group } from "../../groupManagement/domains/group.entity";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import { Student } from "./student.entity";

export type StudentProfile = {
  student: ID;
  schoolYear: ID;
  class: ID | null;
  groups: ID[];
  classGroup: ID | null;
  isExceptionallyPromoted: boolean;
} & BaseEntity;

export type StudentProfileMetaData = GenerateMetaData<
  StudentProfile,
  {
    student: Student;
    schoolYear: SchoolYear;
    classGroup: ClassGroup;
    class: Class;
    groups: Group[];
  }
>;
