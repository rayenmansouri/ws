import { BaseUser } from "../../base-user/domain/base-user.entity";

export type Master = BaseUser & {
  isMaster: boolean;
};