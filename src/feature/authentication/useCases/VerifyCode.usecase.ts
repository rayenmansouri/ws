import { injectable } from "inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { inject } from "../../../core/container/TypedContainer";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { VerificationCode } from "../domain/verificationCode.entity";
import { VerificationCodeRepo } from "../domain/VerificationCode.repo";

type VerifyCodeUseCaseData = {
  code: string;
  user: BaseUser;
  userType: TEndUserEnum;
};

@injectable()
export class VerifyCodeUseCase {
  constructor(@inject("VerificationCodeRepo") private verificationCodeRepo: VerificationCodeRepo) {}

  async execute(data: VerifyCodeUseCaseData): Promise<VerificationCode> {
    const { code, user, userType } = data;

    const verificationCodeDoc = await this.verificationCodeRepo.findByUser(user._id, userType);

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
