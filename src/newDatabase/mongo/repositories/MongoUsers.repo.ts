import { injectable } from "inversify";
import { ClientSession, Connection, PipelineStage } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { UsersRepo } from "../../../feature/users/domain/user.repo";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { Participant } from "./../../../feature/messages/dtos/participant.dto";
import { ID } from "./../../../types/BaseEntity";
import { UsersAggregationBuilder } from "./../aggregations/UsersAggregation";
import { BaseUser } from "../../../feature/users/domain/baseUser.entity";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { FileDetails } from "../../../core/fileManager/FileManager";

@injectable()
export class MongoUsersRepo extends UsersRepo {
  constructor(
    @inject("Connection") private connection: Connection,
    @inject("Session") private session: ClientSession,
  ) {
    super();
  }

  async findUserByNewIdOrThrow(endUser: TEndUserEnum, userNewId: string): Promise<BaseUser> {
    const user = await this.connection
      .model<BaseUser>(endUser)
      .findOne({ newId: userNewId })
      .lean();

    if (!user) throw new NotFoundError("notFound.user");

    return user;
  }

  async findUserByIdOrThrow(endUser: TEndUserEnum, userId: ID): Promise<BaseUser> {
    const user = await this.connection.model<BaseUser>(endUser).findOne({ _id: userId }).lean();

    if (!user) throw new NotFoundError("notFound.user");

    return user;
  }

  async findManyByNewIdOrThrow(endUser: TEndUserEnum, userNewIds: string[]): Promise<BaseUser[]> {
    const users = await this.connection
      .model<BaseUser>(endUser)
      .find({ newId: { $in: userNewIds } })
      .lean();

    if (users.length !== userNewIds.length) throw new NotFoundError("notFound.user");

    return users;
  }

  async updateUserById(endUser: TEndUserEnum, userId: ID, data: Partial<BaseUser>): Promise<void> {
    await this.connection
      .model(endUser)
      .updateOne({ _id: userId }, data, { new: true, session: this.session })
      .lean();
  }

  async getUsersByFullName(
    fullName: string,
    targetUserTypes: TEndUserEnum[],
    excludeUserIds: ID[] = [],
  ): Promise<Participant[]> {
    const pipeline: PipelineStage[] = [
      { $match: { _id: { $exists: false }, isImpersonation: false } },
      ...targetUserTypes.map(userType =>
        UsersAggregationBuilder.buildUserSearchPipeline(
          `${userType.toLowerCase()}s`,
          fullName,
          excludeUserIds,
        ),
      ),
      { $sort: { priority: 1, fullName: 1 } },
      {
        $project: {
          _id: 1,
          newId: 1,
          fullName: 1,
          avatar: 1,
          userType: 1,
        },
      },
      { $limit: 6 },
    ];

    const user = await this.connection
      .model("admin")
      .aggregate<Omit<Participant, "avatar"> & { avatar: FileDetails }>(pipeline);

    return user.map(user => ({
      ...user,
      avatar: user.avatar.link,
    }));
  }

  async updateAvatar(Enduser: TEndUserEnum, userId: ID, avatarFile: FileDetails): Promise<void> {
    const userType = `${Enduser.toLowerCase()}`;
    await this.connection
      .model(userType)
      .updateOne({ _id: userId }, { $set: { avatar: avatarFile } }, { new: true })
      .lean();
  }
}
