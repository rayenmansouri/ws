import { injectable } from "inversify";
import moment from "moment";
import { smsExpiresIn } from "../../../config";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError, InternalError } from "../../../core/ApplicationErrors";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { inject } from "../../../core/container/TypedContainer";
import { EmailManager } from "../../emailManager/domain/EmailManager";
import { ForgetPasswordEmail } from "../../emailManager/emails/ForgetPasswordEmail";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { School } from "../../schools/domain/school.entity";
import { CentralUser } from "../../users/domain/centralUser.entity";
import { VerificationCodeRepo } from "../domain/VerificationCode.repo";
import { SmsManager } from "../../smsManager/domain/SmsManager";
import { ForgetPasswordSms } from "../../smsManager/sms/FogetPasswordSms";

type ForgetPasswordRequest = {
  credential: string;
  userType: TEndUserEnum;
  user: CentralUser;
};

@injectable()
export class ForgetPasswordUseCase {
  constructor(
    @inject("VerificationCodeRepo") private verificationCodeRepo: VerificationCodeRepo,
    @inject("EmailManager") private emailManager: EmailManager,
    @inject("SmsManager") private smsManager: SmsManager,
    @inject("School") private school: School,
  ) {}

  async execute(request: ForgetPasswordRequest): Promise<{ email: string }> {
    const verificationCode = RandomUtils.generateRandomNumber(4).toString();

    const { credential, userType, user } = request;

    if (userType === "master") throw new BadRequestError("master user type is not allowed");

    const isEmail = credential.includes("@");

    const hashedVerificationCode = await AuthenticationHelper.hashString(verificationCode);
    const verificationCodeExpiresAt = moment().add(smsExpiresIn, "minutes").toDate();

    const payload = {
      verificationCode: hashedVerificationCode,
      verificationCodeExpiresAt,
      isUsed: false,
      user: user.userId,
      userType,
    };

    await this.verificationCodeRepo.upsertOne(payload);

    const isEligibleForEmailReset = isEmail && !!user.email;
    const isEligibleForSmsReset = !isEmail && !!user.phoneNumber;

    if (isEligibleForEmailReset) {
      const forgotPasswordTemplate = new ForgetPasswordEmail({
        verificationCode,
        entity: userType,
        ...this.school,
      });

      await this.emailManager.sendEmail(forgotPasswordTemplate, user.email!);
    } else if (isEligibleForSmsReset) {
      const sms = new ForgetPasswordSms(verificationCode);
      await this.smsManager.sendSms(sms, user.phoneNumber!);
    } else {
      throw new InternalError("user does not have email or phone number");
    }
    return { email: credential };
  }
}
