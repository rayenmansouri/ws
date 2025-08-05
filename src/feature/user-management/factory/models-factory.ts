import { model, Model } from "mongoose";
import { MasterSchema } from "../master/domain/master.schema";
import { UserTypeEnum } from "./enums";
import { BaseUser } from "../base-user/domain/base-user.entity";
import { BaseUserSchema } from "../base-user/domain/base-user.schema";
import { CoachSchema } from "../coach/coach.schema";


export function getUserModel<T extends BaseUser>(type: UserTypeEnum): Model<T> { //for now it's only master but we can add more types later
  const BaseUserModel = model<BaseUser>("users", BaseUserSchema);
  switch (type) {
    case UserTypeEnum.MASTER:
      return BaseUserModel.discriminator<T>(UserTypeEnum.MASTER, MasterSchema);
    case UserTypeEnum.COACH:
      return BaseUserModel.discriminator<T>(UserTypeEnum.COACH, CoachSchema);
    default:
      throw new Error(`User type ${type} not supported`);
  }
}