import { injectable } from "inversify/lib/inversify";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { UsersRepo } from "../../users/domain/user.repo";
import { PostRepo } from "../repos/Post.repo";

@injectable()
export class GetUsersOfPostForMentionUseCase {
  private readonly MAX_USERS = 40;

  constructor(
    @inject("PostRepo") private postRepo: PostRepo,
    @inject("UsersRepo") private usersRepo: UsersRepo,
  ) {}

  async execute(dto: { search?: string; postNewId: string }): Promise<
    {
      type: TEndUserEnum;
      fullName: string;
      newId: string;
      _id: ID;
    }[]
  > {
    const post = await this.postRepo.findOneByNewIdOrThrow(dto.postNewId, "notFound.post");

    const users = await this.usersRepo.listUsers(
      {
        fullName: dto.search,
        userTypes: post.userTypes,
        classes: post.classes || undefined,
        levels: post.levels || undefined,
        groupIds: post.groups || undefined,
      },
      {
        limit: this.MAX_USERS,
        page: 1,
      },
    );

    return users.docs.map(user => ({
      type: user.userType,
      fullName: user.fullName,
      newId: user.newId,
      _id: user._id,
    }));
  }
}
