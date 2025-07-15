import { TEndUserEnum } from "../../../constants/globalEnums";
import { DomainEvent } from "../../../core/domainEvents/DomainEvent";
import { BaseUser } from "./baseUser.entity";

export class NewUserAddedEvent extends DomainEvent {
  public readonly user: BaseUser;
  public readonly userType: TEndUserEnum;
  public readonly password: string;

  constructor({
    user,
    password,
    userType,
    schoolSubdomain,
  }: {
    user: BaseUser;
    password: string;
    userType: TEndUserEnum;
    schoolSubdomain: string;
  }) {
    super(schoolSubdomain);
    this.user = user;
    this.userType = userType;
    this.password = password;
  }
}
