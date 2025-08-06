import { injectable } from "inversify/lib/inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { inject } from "../../../core/container/TypedContainer";
import { School } from "../../schools/domain/school.entity";
import { UsersRepo } from "../../users/domain/user.repo";
import { VerificationCodeRepo } from "../domain/VerificationCode.repo";
import { VerifyCodeUseCase } from "./VerifyCode.usecase";

type TResetPasswordUseCaseData = {
  code: string;
  userType: TEndUserEnum;
  newPassword: string;
  credential: string;
};

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("VerifyCodeUseCase") private verifyCodeUseCase: VerifyCodeUseCase,
    @inject("UsersRepo") private usersRepo: UsersRepo,
    @inject("VerificationCodeRepo") private verificationCodeRepo: VerificationCodeRepo,
    @inject("School") private school: School,
  ) {}

  async execute(data: TResetPasswordUseCaseData): Promise<{ token: string }> {
    const { code, userType, credential } = data;
    const user = await this.usersRepo.findByIdentifierOrThrow(credential, userType);
    const verificationCode = await this.verifyCodeUseCase.execute({
      code,
      user,
      userType,
    });

    await this.verificationCodeRepo.updateOneById(verificationCode._id, {
      isUsed: true,
    });

    const passwordHash = await AuthenticationHelper.hashString(data.newPassword);

    await this.usersRepo.updateUserById(data.userType, user._id, {
      password: passwordHash,
      passwordChangedAt: new Date(),
    });

    const token = AuthenticationHelper.generateUserToken(user._id, this.school._id);

    return { token };
  }
}
