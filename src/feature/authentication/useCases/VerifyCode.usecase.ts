import { inject } from "../../../core/container/TypedContainer";
import { VerificationCodeRepository } from "../domain/verificationCode.repo";
import { VerificationCode } from "../domain/verificationCode.entity";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { UserTypeEnum } from "../../user-management/factory/enums";
import { BaseUserEntity } from "../../user-management/base-user/domain/base-user.entity";
import { VERIFICATION_CODE_REPOSITORY_IDENTIFIER } from "../domain/constant";
 import { BadRequestError } from "../../../core/ApplicationErrors";
 import { AuthenticationHelper } from "../../../core/auth.helper";
 
export const VERIFY_CODE_USE_CASE = "VerifyCodeUseCase";

type VerifyCodeUseCaseData = {
    code: string;
    user: BaseUserEntity;
  };
  
@Injectable({
    identifier: VERIFY_CODE_USE_CASE
})
export class VerifyCodeUseCase {
    constructor(@inject(VERIFICATION_CODE_REPOSITORY_IDENTIFIER) private verificationCodeRepo: VerificationCodeRepository) {}
  
    async execute(data: VerifyCodeUseCaseData): Promise<VerificationCode> {
      const { code, user } = data;
  
      const userId = user.id;
      const verificationCodeDoc = await this.verificationCodeRepo.findOne({ user: userId });
      if (!verificationCodeDoc) throw new BadRequestError("invalid.code");
  
      if (verificationCodeDoc.isUsed) throw new BadRequestError("invalid.code");
      const isCodeValid = await AuthenticationHelper.checkStringHashMatch(
        code,
        verificationCodeDoc.verificationCode,
      );
      if (!isCodeValid) throw new BadRequestError("invalid.code");
  
      const isCodeExpired =
        new Date().getTime() > verificationCodeDoc.verificationCodeExpiresAt.getTime();
  
      if (isCodeExpired) throw new BadRequestError("invalid.code");
  
      return verificationCodeDoc;
    }
  }
  
