import { TEndUserEnum } from "../../../constants/globalEnums";
import { BaseRepo } from "../../../core/BaseRepo";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { VerificationCodeMetaData } from "./verificationCode.entity";

export abstract class VerificationCodeRepo extends BaseRepo<VerificationCodeMetaData> {
  abstract findByUser(
    userId: ID,
    userType: TEndUserEnum,
  ): Promise<VerificationCodeMetaData["entity"] | null>;

  abstract upsertOne(
    payload: Omit<VerificationCodeMetaData["entity"], keyof BaseEntity>,
  ): Promise<VerificationCodeMetaData["entity"]>;
}
