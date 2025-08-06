import { Connection } from "mongoose";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { TEndUserEnum } from "../../constants/globalEnums";
import { BaseUser } from "../../feature/user-management/base-user/domain/base-user.entity";

export type RequestFields = {
  tenantId: string;
  userId: string;
  tokenExpires: number;
  connection: Connection;
  user: BaseUser;
  userType: TEndUserEnum;
};
export type protectsSocket = Socket & RequestFields;
export type nextWS = (err?: ExtendedError | undefined) => void;
export type middlewareWS = (socket: Socket, next: nextWS) => void;
