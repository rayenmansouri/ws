import { GenerateMetaData } from "../../../core/populateTypes";
import { ID, BaseEntity } from "../../../types/BaseEntity";
import { Student } from "../../students/domain/student.entity";
import { Class } from "./class.entity";

export type ClassGroup = {
  name: string;
  class: ID;
  students: ID[];
} & BaseEntity;

export type ClassGroupMetaData = GenerateMetaData<
  ClassGroup,
  {
    class: Class;
    students: Student[];
  }
>;
