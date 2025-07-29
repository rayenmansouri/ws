import { BaseUser } from "../../base-user/domain/base-user.entity";

export type Master = BaseUser & {
  isMaster: boolean;
};


export const MASTER_USER_TENANT_ID = "MASTER_DATABASE";