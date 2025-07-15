import { GenerateMetaData } from "../../../core/populateTypes";
import { ID } from "../../../types/BaseEntity";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { Level } from "../../levels/domains/level.entity";
import { Role } from "../../authorization/domain/role.entity";
import { Parent } from "../../parents/domain/parent.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export type Student = {
  level: ID;
  classType: ID;
  nextClassType: ID | null;
  parents: ID[];
  uniqueId: string | null;
} & BaseUser;

export type StudentMetaData = GenerateMetaData<
  Student,
  {
    classType: ClassType;
    level: Level;
    parents: Parent[];
    nextClassType: ClassType;
    roles: Role[];
  }
>;
