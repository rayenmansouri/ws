import { injectable } from "inversify";
import { ClientSession } from "mongoose";
import { TUserTypeEnum } from "./baseUser.entity";
import { CentralUser } from "./centralUser.entity";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";

@injectable()
export abstract class CentralUserRepo {
  constructor(@inject("Session") protected session: ClientSession | null) {}

  abstract findOneByEmail(email: string, userType: TUserTypeEnum): Promise<CentralUser | null>;

  abstract findByAnyIdentifier(
    identifier: string,
    userType: TUserTypeEnum,
  ): Promise<CentralUser | null>;

  abstract findOneByPhoneNumber(
    phoneNumber: string,
    userType: TUserTypeEnum,
  ): Promise<CentralUser | null>;

  abstract addOne(payload: CentralUser, userType: TUserTypeEnum): Promise<CentralUser>;
  abstract addMany(payload: CentralUser[], userType: TUserTypeEnum): Promise<CentralUser[]>;

  abstract updateOne(
    payload: {
      email: string | null | undefined;
      phoneNumber: string | null | undefined;
      userId: ID;
      tenantId: ID;
    },
    userTye: TUserTypeEnum,
  ): Promise<void>;

  async ensureEmailUniquenessOnAdd(email: string, userType: TUserTypeEnum): Promise<void> {
    const centralUserWithSameEmail = await this.findOneByEmail(email, userType);

    if (centralUserWithSameEmail) console.log({ email });

    if (centralUserWithSameEmail) throw new BadRequestError("alreadyUsed.email");
  }

  async ensurePhoneUniquenessOnAdd(phone: string, userType: TUserTypeEnum): Promise<void> {
    const centralUserWithSamePhone = await this.findOneByPhoneNumber(phone, userType);

    if (centralUserWithSamePhone) console.log({ phone });

    if (centralUserWithSamePhone) throw new BadRequestError("alreadyUsed.phoneNumber");
  }

  async ensureEmailUniquenessOnUpdate(
    email: string,
    userId: ID,
    userType: TUserTypeEnum,
  ): Promise<void> {
    const centralUserWithSameEmail = await this.findOneByEmail(email, userType);

    if (centralUserWithSameEmail && centralUserWithSameEmail.userId !== userId)
      throw new BadRequestError("alreadyUsed.email");
  }

  async ensurePhoneUniquenessOnUpdate(
    phone: string,
    userId: ID,
    userType: TUserTypeEnum,
  ): Promise<void> {
    const centralUserWithSamePhone = await this.findOneByPhoneNumber(phone, userType);

    if (centralUserWithSamePhone && centralUserWithSamePhone.userId !== userId)
      throw new BadRequestError("alreadyUsed.phoneNumber");
  }
}
