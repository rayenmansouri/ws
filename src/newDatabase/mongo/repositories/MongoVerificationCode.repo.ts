import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { VerificationCodeMetaData } from "../../../feature/authentication/domain/verificationCode.entity";
import { VerificationCodeRepo } from "../../../feature/authentication/domain/VerificationCode.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { ID, BaseEntity } from "../../../types/BaseEntity";

export class MongoVerificationCodeRepo
  extends MongoBaseRepo<VerificationCodeMetaData>
  implements VerificationCodeRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "verificationCode", session);
  }
  findByUser(
    userId: ID,
    userType: TEndUserEnum,
  ): Promise<VerificationCodeMetaData["entity"] | null> {
    return this.model.findOne({ user: userId, userType }).lean();
  }
  upsertOne(
    payload: Omit<VerificationCodeMetaData["entity"], keyof BaseEntity>,
  ): Promise<VerificationCodeMetaData["entity"]> {
    return this.model
      .findOneAndUpdate({ user: payload.user, userType: payload.userType }, payload, {
        new: true,
        upsert: true,
        session: this.session,
        setDefaultsOnInsert: true,
      })
      .lean();
  }
}
