import { injectable } from "inversify";
import moment from "moment";
import { smsExpiresIn } from "../../../config";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { BadRequestError, InternalError } from "../../../core/ApplicationErrors";
import { AuthenticationHelper } from "../../../core/auth.helper";
import { inject } from "../../../core/container/TypedContainer";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { EmailManager } from "../../emailManager/domain/EmailManager";
import { ForgetPasswordEmail } from "../../emailManager/emails/ForgetPasswordEmail";
import { School } from "../../schools/domain/school.entity";
import { SmsManager } from "../../smsManager/domain/SmsManager";
import { ForgetPasswordSms } from "../../smsManager/sms/FogetPasswordSms";
import { UsersRepo } from "../../users/domain/user.repo";
import { VerificationCodeRepo } from "../domain/VerificationCode.repo";

type ForgetPasswordRequest = {
  credential: string;
  userType: TEndUserEnum;
};

@injectable()
export class ForgetPasswordUseCase {
  constructor(
    @inject("VerificationCodeRepo") private verificationCodeRepo: VerificationCodeRepo,
    @inject("EmailManager") private emailManager: EmailManager,
    @inject("SmsManager") private smsManager: SmsManager,
    @inject("School") private school: School,
    @inject("UsersRepo") private usersRepo: UsersRepo,
  ) {}

  async execute(request: ForgetPasswordRequest): Promise<{ email: string }> {
    const verificationCode = RandomUtils.generateRandomNumber(4).toString();

    const { credential, userType } = request;

    if (userType === "master") throw new BadRequestError("master user type is not allowed");

    const isEmail = credential.includes("@");

    const hashedVerificationCode = await AuthenticationHelper.hashString(verificationCode);
    const verificationCodeExpiresAt = moment().add(smsExpiresIn, "minutes").toDate();
    const user = await this.usersRepo.findByIdentifierOrThrow(credential, userType);

    const payload = {
      verificationCode: hashedVerificationCode,
      verificationCodeExpiresAt,
      isUsed: false,
      user: user._id,
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
