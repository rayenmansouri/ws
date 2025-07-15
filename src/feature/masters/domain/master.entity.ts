import { GenerateMetaData } from "../../../core/populateTypes";
import { Role } from "../../authorization/domain/role.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export type Master = BaseUser;

export type MasterMetaData = GenerateMetaData<
  Master,
  {
    roles: Role[];
  }
>;
