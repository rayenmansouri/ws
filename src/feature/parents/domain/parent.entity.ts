import { GenerateMetaData } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { Role } from "../../authorization/domain/role.entity";
import { Student } from "../../students/domain/student.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export type Parent = {
  students: ID[];
  nationalCardId: string | null;
} & BaseUser;

export type ParentMetaData = GenerateMetaData<
  Parent,
  {
    students: Student[];
    roles: Role[];
  }
>;
