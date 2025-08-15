import { BadRequestError } from "../../../core/ApplicationErrors";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { inject } from "../../../core/container/TypedContainer";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { EmailManager } from "../../emailManager/domain/EmailManager";
import { SmsManager } from "../../smsManager/domain/SmsManager";
import { UserTypeEnum } from "../../user-management/factory/enums";
import { BaseUserEntity } from "../../users/domain/baseUser.entity";
import { VerificationCodeRepository } from "../domain/verificationCode.repo";
import { CREATE_VERIFICATION_CODE_USE_CASE_IDENTIFIER } from "./constants";
import { AuthenticationHelper } from "../../../core/auth.helper";
import moment from "moment";
import { ForgetPasswordEmail } from "../../emailManager/emails/ForgetPasswordEmail";
import { ForgetPasswordSms } from "../../smsManager/sms/FogetPasswordSms";
import { InternalError } from "../../../core/ApplicationErrors";
import { VERIFICATION_CODE_REPOSITORY_IDENTIFIER } from "../domain/constant";
import { EMAIL_MANAGER_IDENTIFIER } from "../../emailManager/constants";
import { SMS_MANAGER_IDENTIFIER } from "../../smsManager/constants";

type ForgetPasswordRequest = {
    credential: string;
    userType: UserTypeEnum; 
    user: BaseUserEntity;
};


  @Injectable({
    identifier: CREATE_VERIFICATION_CODE_USE_CASE_IDENTIFIER,
  })
  export class ForgetPasswordUseCase {
    constructor(
      @inject(VERIFICATION_CODE_REPOSITORY_IDENTIFIER) private verificationCodeRepo: VerificationCodeRepository,
      @inject(EMAIL_MANAGER_IDENTIFIER) private emailManager: EmailManager,
      @inject(SMS_MANAGER_IDENTIFIER) private smsManager: SmsManager,
    ) {}
  
    async execute(request: ForgetPasswordRequest): Promise<{ email: string }> {
      const verificationCode = RandomUtils.generateRandomNumber(4).toString();
  
      const { credential, userType, user } = request;
  
      if (userType === UserTypeEnum.MASTER) throw new BadRequestError("master user type is not allowed");
  
      const isEmail = credential.includes("@");

      const hashedVerificationCode = await AuthenticationHelper.hashString(verificationCode);
      const verificationCodeExpiresAt = moment().add(1e3*5, "minutes").toDate();
      const payload = {
        verificationCode: hashedVerificationCode,
        verificationCodeExpiresAt,
        isUsed: false,
        user: user.id,
        userType,
      };
  
      await this.verificationCodeRepo.upsertOne(payload);
  
      const isEligibleForEmailReset = isEmail && !!user.email;
      const isEligibleForSmsReset = !isEmail && !!user.phoneNumber;
  
      if (isEligibleForEmailReset) {
        const forgotPasswordTemplate = new ForgetPasswordEmail({
          verificationCode,
          entity: userType,
          subdomain: user.schoolSubdomain,
          phoneNumber: user.phoneNumber,
          address: "Address",
          email: user.email,
        });
  
        await this.emailManager.sendEmail(forgotPasswordTemplate, user.email);
      } else if (isEligibleForSmsReset) {
        const sms = new ForgetPasswordSms(verificationCode);
        await this.smsManager.sendSms(sms, user.phoneNumber);
      } else {
        throw new InternalError("user does not have email or phone number");
      }
      return { email: credential };
    }
  }
  