import { TEndUserEnum } from "../../../constants/globalEnums";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { BaseUser } from "../../users/domain/baseUser.entity";

export type VerificationCode = {
  user: ID;
  verificationCode: string;
  verificationCodeExpiresAt: Date;
  isUsed: boolean;
  userType: TEndUserEnum;
} & BaseEntity;

export type VerificationCodeMetaData = GenerateMetaData<VerificationCode, { user: BaseUser }>;
