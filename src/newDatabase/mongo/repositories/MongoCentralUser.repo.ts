import { injectable } from "inversify";
import { centralDatabaseConnection } from "../../../database/connectionDB/centralDBConnection";
import { TUserTypeEnum } from "../../../feature/users/domain/baseUser.entity";
import { CentralUser } from "../../../feature/users/domain/centralUser.entity";
import { CentralUserRepo } from "../../../feature/users/domain/CentralUser.repo";

@injectable()
export class MongoCentralUserRepo extends CentralUserRepo {
  protected connection = centralDatabaseConnection;

  async addOne(payload: CentralUser, userType: TUserTypeEnum): Promise<CentralUser> {
    const centralUser = await this.connection
      .model<CentralUser>(userType)
      .create([payload], { session: this.session || undefined });

    return centralUser[0].toObject();
  }

  async addMany(payload: CentralUser[], userType: TUserTypeEnum): Promise<CentralUser[]> {
    return await this.connection
      .model<CentralUser>(userType)
      .insertMany(payload, { session: this.session || undefined })
      .then(users => users.map(user => user.toObject()));
  }

  async findByAnyIdentifier(
    identifier: string,
    userType: TUserTypeEnum,
  ): Promise<CentralUser | null> {
    return await this.connection.model<CentralUser>(userType).findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }, { newId: identifier }],
    });
  }

  async updateOne(
    payload: {
      email: string | null | undefined;
      phoneNumber: string | null | undefined;
      userId: string;
      tenantId: string;
    },
    userTye: TUserTypeEnum,
  ): Promise<void> {
    if (payload.email === undefined && payload.phoneNumber === undefined) return;

    const updateUserPayload: {
      $set: {
        email?: string;
        phoneNumber?: string;
      };
      $unset: {
        email?: 1;
        phoneNumber?: 1;
      };
    } = {
      $set: {},
      $unset: {},
    };

    if (payload.email) updateUserPayload.$set.email = payload.email;
    if (payload.email === null) updateUserPayload.$unset.email = 1;

    if (payload.phoneNumber) updateUserPayload.$set.phoneNumber = payload.phoneNumber;
    if (payload.phoneNumber === null) updateUserPayload.$unset.phoneNumber = 1;

    await this.connection
      .model<CentralUser>(userTye)
      .findOneAndUpdate({ userId: payload.userId }, updateUserPayload);
  }

  async findOneByEmail(email: string, userType: TUserTypeEnum): Promise<CentralUser | null> {
    const query = this.connection.model<CentralUser>(userType).findOne({
      email,
    });

    if (this.session) query.session(this.session);

    return await query;
  }

  async findOneByPhoneNumber(
    phoneNumber: string,
    userType: TUserTypeEnum,
  ): Promise<CentralUser | null> {
    const query = this.connection.model<CentralUser>(userType).findOne({
      phoneNumber,
    });

    if (this.session) query.session(this.session);

    return await query;
  }
}
