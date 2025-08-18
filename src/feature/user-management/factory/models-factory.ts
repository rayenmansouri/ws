import { Connection, Model } from "mongoose";
import { MasterSchema } from "../master/domain/master.schema";
import { UserTypeEnum } from "./enums";
import { BaseUser } from "../base-user/domain/base-user.entity";
import { BaseUserSchema } from "../base-user/domain/base-user.schema";
import { CoachSchema } from "../coach/coach.schema";
import { OrganizationSystemType } from "../../organization-magement/enums";
import { dncMongoSchema } from "../participant/dnc/dnc-mongo.schema";
import { participantSchema } from "../participant/participant.schema";

export function getUserModel<T extends BaseUser>(connection: Connection, type: UserTypeEnum, schoolSystemEnum: OrganizationSystemType): Model<T> { 
  const BaseUserModel = connection.model<BaseUser>("users", BaseUserSchema);
  switch (type) {
    case UserTypeEnum.MASTER:
      return BaseUserModel.discriminator<T>(UserTypeEnum.MASTER, MasterSchema);
    case UserTypeEnum.COACH:
      return BaseUserModel.discriminator<T>(UserTypeEnum.COACH, CoachSchema);
    case UserTypeEnum.PARTICIPANT:
      switch (schoolSystemEnum) {
        case OrganizationSystemType.DNC:
          const dncSchema = BaseUserModel?.discriminators?.[UserTypeEnum.PARTICIPANT] as Model<T>;
          if(dncSchema !== undefined) {
            return dncSchema;
          }
          return BaseUserModel.discriminator<T>(UserTypeEnum.PARTICIPANT, participantSchema.add(dncMongoSchema));
        default:
          throw new Error(`School system ${schoolSystemEnum} not supported`);
      }
    default:
      throw new Error(`User type ${type} not supported`);
  }
}