import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { BaseUserEntity } from "../../user-management/base-user/domain/base-user.entity";
import { UserRepository } from "../../user-management/base-user/domain/base-user.repository";
import { VerificationCodeRepository } from "../domain/verificationCode.repo";
import { VERIFY_CODE_USE_CASE, VerifyCodeUseCase } from "./VerifyCode.usecase";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../user-management/constants";
import { VERIFICATION_CODE_REPOSITORY_IDENTIFIER } from "../domain/constant";
import { inject } from "../../../core/container/TypedContainer";

export const RESET_PASSWORD_USE_CASE = "ResetPasswordUseCase";

type TResetPasswordUseCaseData = {
  code: string;
  user: BaseUserEntity
  newPassword: string;
};

@Injectable({
    identifier: RESET_PASSWORD_USE_CASE
})
export class ResetPasswordUseCase {
  constructor(
    @inject(VERIFY_CODE_USE_CASE) private verifyCodeUseCase: VerifyCodeUseCase,
    @inject(BASE_USER_REPOSITORY_IDENTIFIER) private usersRepo: UserRepository,
    @inject(VERIFICATION_CODE_REPOSITORY_IDENTIFIER) private verificationCodeRepo: VerificationCodeRepository,
  ) {}

  async execute(data: TResetPasswordUseCaseData): Promise<{ token: string }> {
    const verificationCode = await this.verifyCodeUseCase.execute(data);

    await this.verificationCodeRepo.updateOne({ _id: verificationCode.id }, {
      isUsed: true,
    });

    const passwordHash = await AuthenticationHelper.hashString(data.newPassword);

    await this.usersRepo.updateOne({ _id: data.user.id }, {
      password: passwordHash,
      passwordChangedAt: new Date(),
    });

    const token = AuthenticationHelper.generateUserToken(data.user.id, data.user.schoolSubdomain);

    return { token };
  }
}
