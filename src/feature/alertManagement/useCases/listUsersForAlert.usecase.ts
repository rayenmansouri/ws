import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ListOptions } from "../../../types/types";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { UsersRepo } from "../../users/domain/user.repo";
import { UserMapper } from "../../users/mappers/User.mapper";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { ID } from "./../../../types/BaseEntity";

@injectable()
export class ListUsersForAlertUseCase {
  constructor(
    @inject("GroupRepo") private readonly groupRepo: GroupRepo,
    @inject("UsersRepo") private readonly usersRepo: UsersRepo,
  ) {}

  async execute(
    filter: {
      fullName?: string;
      userTypes: TEndUserEnum[];
      groupTypeIds?: ID[];
      classes?: ID[];
      classTypes?: ID[];
      levels?: ID[];
    },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<{
      fullName: string;
      phoneNumber: string | null;
      _id: string;
      avatar: string;
      userType: TEndUserEnum;
    }>
  > {
    let groupIds: ID[] = [];

    if (filter.groupTypeIds) {
      const groups = await this.groupRepo.findManyByGroupTypes(filter.groupTypeIds);

      groupIds = groups.map(group => group._id);
    }

    const users = await this.usersRepo.listUsers(
      {
        ...filter,
        groupIds,
      },
      options,
    );

    const docs = users.docs.map(user => ({
      ...UserMapper.toUserProfileDTO(user),
      avatar: user.avatar.link,
      userType: user.userType,
    }));

    return { docs, meta: users.meta };
  }
}
