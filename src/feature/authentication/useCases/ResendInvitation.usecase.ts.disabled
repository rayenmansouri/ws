import { injectable } from "inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { EmailManager } from "../../emailManager/domain/EmailManager";
import { WelcomeAboardEmail } from "../../emailManager/emails/WelcomeAboardEmail";
import { HashingHelper } from "../../../helpers/HashUtils";
import { RandomUtils } from "../../../helpers/RandomUtils";
import { OmitFromEnum } from "../../../types/utils/enums.util";
import { School } from "../../schools/domain/school.entity";
import { UsersRepo } from "../../users/domain/user.repo";
import { SmsManager } from "../../smsManager/domain/SmsManager";
import { WelcomeSms } from "../../smsManager/sms/WelcomeSms";
import { DownloadAppSms } from "../../smsManager/sms/DownloadAppSms";

export type ResendInvitationResponseDTO = {
  fullName: string;
  identifier: string;
  password: string;
};

@injectable()
export class ResendInvitationUseCase {
  constructor(
    @inject("UsersRepo") private usersRepo: UsersRepo,
    @inject("EmailManager") private emailManager: EmailManager,
    @inject("SmsManager") private smsManager: SmsManager,
    @inject("School") private school: School,
  ) {}

  async execute(
    userNewIds: string[],
    userType: OmitFromEnum<TEndUserEnum, "master">,
  ): Promise<ResendInvitationResponseDTO[]> {
    const users = await this.usersRepo.findManyByNewIdOrThrow(
      userNewIds.map(newId => ({
        type: userType,
        newId,
      })),
    );

    const updatePromises: Promise<void>[] = [];
    const emailPromises: Promise<void>[] = [];
    const smsPromises: Promise<void>[] = [];
    const response: ResendInvitationResponseDTO[] = [];

    for (const user of users) {
      const randomPassword = RandomUtils.generateRandomNumber(8).toString();
      const passwordHash = await HashingHelper.generateHash(randomPassword);

      updatePromises.push(
        this.usersRepo.updateUserById(userType, user._id, {
          password: passwordHash,
        }),
      );

      if (user.email) {
        const email = new WelcomeAboardEmail({
          userType,
          email: user.email,
          fullName: user.fullName,
          password: randomPassword,
          schoolAddress: this.school.address || "_",
          schoolSubdomain: this.school.subdomain,
          schoolPhone: this.school.phoneNumber || "_",
          schoolEmail: this.school.email || "_",
        });

        emailPromises.push(this.emailManager.sendEmail(email, user.email));
      }

      if (user.phoneNumber) {
        const sms = new WelcomeSms({
          password: randomPassword,
          schoolName: this.school.name,
          phoneNumber: user.phoneNumber,
        });

        const downloadAppSms = new DownloadAppSms();

        smsPromises.push(this.smsManager.sendSms(sms, user.phoneNumber));
        smsPromises.push(this.smsManager.sendSms(downloadAppSms, user.phoneNumber));
      }

      const userIdentifier: string =
        user.phoneNumber || user.email || this.school.newId + "." + user.newId;

      response.push({
        fullName: user.fullName,
        identifier: userIdentifier,
        password: randomPassword,
      });
    }

    await Promise.all(updatePromises);

    await Promise.all([...emailPromises, ...smsPromises]);

    return response;
  }
}
