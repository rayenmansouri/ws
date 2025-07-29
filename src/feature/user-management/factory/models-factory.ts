import { model, Model } from "mongoose";
import { MasterSchema } from "../master/domain/master.schema";
import { UserTypeEnum } from "./enums";
import { BaseUser } from "../base-user/domain/base-user.entity";
import { BaseUserSchema } from "../base-user/domain/base-user.schema";
import { Master } from "../master/domain/master.entity";


export function getUserModel(type: UserTypeEnum): Model<Master> { //for now it's only master but we can add more types later
  const BaseUserModel = model<BaseUser>("users", BaseUserSchema);
  switch (type) {
    case UserTypeEnum.MASTER:
      return BaseUserModel.discriminator<Master>(UserTypeEnum.MASTER, MasterSchema);
    default:
      throw new Error(`User type ${type} not supported`);
  }
}