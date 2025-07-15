import { AddAlertUseCaseRequest } from "./../useCases/AddAlert.usecase";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { MINIMUM_USERS_ALLOWED } from "./../constants/alertStatus.constant";
import { SmsManager } from "../../smsManager/domain/SmsManager";

export class AlertService {
  private static isContentValid(
    content: string,
    types: { sms: boolean; notification: boolean },
  ): boolean {
    const isAnyTypeEnabled = types.sms || types.notification;
    const isLengthValid = SmsManager.isValidLengthSms(content);

    return isAnyTypeEnabled && isLengthValid;
  }

  private static hasMinimumUniqueUsers(
    users: { userType: TEndUserEnum; userId: string }[],
  ): boolean {
    const uniqueUserSet = new Set(users.map(user => user.userId));
    return uniqueUserSet.size >= MINIMUM_USERS_ALLOWED;
  }

  private static validateScheduledAndDraftStatus(
    isDraft: boolean,
    scheduledAt: Date | undefined,
  ): boolean {
    if (isDraft && scheduledAt) return false;
    return true;
  }

  static hasEnoughSmsSold(requiredCount: number, availableCount: number): boolean {
    return availableCount >= requiredCount;
  }

  static validate(dto: AddAlertUseCaseRequest): boolean {
    return (
      this.isContentValid(dto.content, dto.types) &&
      this.hasMinimumUniqueUsers(dto.users) &&
      this.validateScheduledAndDraftStatus(dto.isDraft, dto.scheduledAt)
    );
  }
}
