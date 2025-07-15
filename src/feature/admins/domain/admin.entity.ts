import { GenerateMetaData } from "../../../core/populateTypes";
import { Role } from "../../authorization/domain/role.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export type Admin = BaseUser & {
  isImpersonation: boolean;
};

export type AdminMetaData = GenerateMetaData<
  Admin,
  {
    roles: Role[];
  }
>;
