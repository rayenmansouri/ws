import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { END_USER_WITHOUT_MASTER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { UsersRepo } from "../../users/domain/user.repo";
import { OmitFromEnum } from "../../../types/utils/enums.util";
import { Admin } from "../../admins/domain/admin.entity";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { HashingHelper } from "../../../helpers/HashUtils";
import { WelcomeAboardEmail } from "../../emailManager/emails/WelcomeAboardEmail";
import { School } from "../../schools/domain/school.entity";
import { EmailManager } from "../../emailManager/domain/EmailManager";
import { SmsManager } from "../../smsManager/domain/SmsManager";
import { WelcomeSms } from "../../smsManager/sms/WelcomeSms";

export type ResetUserPasswordUseCaseRequest = {
  userType: OmitFromEnum<TEndUserEnum, "master">;
  userNewId: string;
  admin: Admin;
  newPassword: string;
};

@injectable()
export class ResetUserPasswordUseCase {
  constructor(
    @inject("UsersRepo") private usersRepo: UsersRepo,
    @inject("EmailManager") private emailManager: EmailManager,
    @inject("SmsManager") private smsManager: SmsManager,
    @inject("School") private school: School,
  ) {}

  async execute({
    userType,
    userNewId,
    admin,
    newPassword,
  }: ResetUserPasswordUseCaseRequest): Promise<void> {
    if (userType === END_USER_WITHOUT_MASTER_ENUM.ADMIN && admin.newId === userNewId)
      throw new BadRequestError("authentication.cannotResetYourOwnPassword");

    const user = await this.usersRepo.findUserByNewIdOrThrow(userType, userNewId);

    const hashedPassword = await HashingHelper.generateHash(newPassword);
    await this.usersRepo.updateUserById(userType, user._id, { password: hashedPassword });

    if (user.email) {
      const welcomeAboardEmail = new WelcomeAboardEmail({
        userType,
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
        password: newPassword,
        schoolAddress: this.school.address || "-",
        schoolEmail: this.school.email || "-",
        schoolPhone: this.school.phoneNumber || "-",
        schoolSubdomain: this.school.subdomain,
      });

      await this.emailManager.sendEmail(welcomeAboardEmail, user.email);
    }

    if (user.phoneNumber) {
      const welcomeMessage = new WelcomeSms({
        schoolName: this.school.name,
        phoneNumber: user.phoneNumber,
        password: newPassword,
      });

      await this.smsManager.sendSms(welcomeMessage, user.phoneNumber);
    }
  }
}
