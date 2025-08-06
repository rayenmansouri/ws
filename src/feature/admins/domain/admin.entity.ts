import { GenerateMetaData } from "../../../core/populateTypes";
import { Role } from "../../authorization/domain/role.entity";
import { BaseUser } from "../../user-management/base-user/domain/base-user.entity";

export type Admin = BaseUser & {
  isImpersonation: boolean;
};

export type AdminMetaData = GenerateMetaData<
  Admin,
  {
    roles: Role[];
  }
>;
