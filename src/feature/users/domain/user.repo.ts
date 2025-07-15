import { injectable } from "inversify";
import { Participant } from "../../messages/dtos/participant.dto";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { ID } from "../../../types/BaseEntity";
import { BaseUser } from "./baseUser.entity";
import { FileDetails } from "../../../core/fileManager/FileManager";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";

@injectable()
export abstract class UsersRepo {
  constructor() {}

  abstract getUsersByFullName(
    fullName: string,
    targetUserTypes: TEndUserEnum[],
    excludeUserIds?: ID[],
  ): Promise<Participant[]>;

  abstract updateAvatar(endUser: TEndUserEnum, userId: ID, avatarFile: FileDetails): Promise<void>;

  abstract updateUserById(
    endUser: TEndUserEnum,
    userId: ID,
    data: Partial<BaseUser>,
  ): Promise<void>;

  abstract findUserByIdOrThrow(endUser: TEndUserEnum, userId: ID): Promise<BaseUser>;

  abstract findUserByNewIdOrThrow(endUser: TEndUserEnum, userNewId: string): Promise<BaseUser>;

  abstract findManyByNewIdOrThrow(
    users: {
      type: TEndUserEnum;
      newId: string;
    }[],
  ): Promise<(BaseUser & { type: TEndUserEnum })[]>;

  abstract listUsers(
    filters: {
      fullName?: string;
      userTypes: TEndUserEnum[];
      groupIds?: ID[];
      classes?: ID[];
      classTypes?: ID[];
      levels?: ID[];
    },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Pick<BaseUser, "_id" | "newId" | "fullName" | "avatar" | "phoneNumber" | "email"> & {
        userType: TEndUserEnum;
      }
    >
  >;
}
