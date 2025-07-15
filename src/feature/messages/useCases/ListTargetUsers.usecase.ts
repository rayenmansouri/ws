import { TEndUserEnum } from "./../../../constants/globalEnums";
import { startConversationRules } from "./../constants/conversation.constant";
import { UsersRepo } from "../../../feature/users/domain/user.repo";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { Participant } from "./../dtos/participant.dto";

@injectable()
export class FindUsersByFullNameUseCase {
  constructor(@inject("UsersRepo") private readonly usersRepo: UsersRepo) {}

  async execute(fullName: string, userType: TEndUserEnum): Promise<Participant[]> {
    const targetUsers = startConversationRules[userType];
    const users = await this.usersRepo.getUsersByFullName(fullName, targetUsers);

    return users;
  }
}
