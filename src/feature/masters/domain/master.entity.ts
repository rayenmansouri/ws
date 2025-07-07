import { BaseUser } from "./../../../shared/domain/baseUser.entity";
import { GenerateMetaData } from "../../../core/populateTypes";
import { Role } from "../../authorization/domain/role.entity";

export type Master = BaseUser;

export type MasterMetaData = GenerateMetaData<
  Master,
  {
    roles: Role[];
  }
>;
