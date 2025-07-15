import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { VerifyCodeUseCase } from "./VerifyCode.usecase";
import { CentralUser } from "../../users/domain/centralUser.entity";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { UsersRepo } from "../../users/domain/user.repo";
import { VerificationCodeRepo } from "../domain/VerificationCode.repo";
import { AuthenticationHelper } from "../../../core/auth.helper";

type TResetPasswordUseCaseData = {
  code: string;
  user: CentralUser;
  userType: TEndUserEnum;
  newPassword: string;
};

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("VerifyCodeUseCase") private verifyCodeUseCase: VerifyCodeUseCase,
    @inject("UsersRepo") private usersRepo: UsersRepo,
    @inject("VerificationCodeRepo") private verificationCodeRepo: VerificationCodeRepo,
  ) {}

  async execute(data: TResetPasswordUseCaseData): Promise<{ token: string }> {
    const verificationCode = await this.verifyCodeUseCase.execute(data);

    await this.verificationCodeRepo.updateOneById(verificationCode._id, {
      isUsed: true,
    });

    const passwordHash = await AuthenticationHelper.hashString(data.newPassword);

    await this.usersRepo.updateUserById(data.userType, data.user.userId, {
      password: passwordHash,
      passwordChangedAt: new Date(),
    });

    const token = AuthenticationHelper.generateUserToken(data.user.userId, data.user.tenantId);

    return { token };
  }
}
