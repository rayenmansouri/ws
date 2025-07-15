import { startConversationRules } from "./../constants/conversation.constant";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { Participant } from "./../dtos/participant.dto";
import { ConversationRepo } from "../domain/Conversation.repo";
import { paginateResult } from "../../../helpers/paginateResult";
import { UsersRepo } from "../../../feature/users/domain/user.repo";

@injectable()
export class ListTargetUsersForGroupConversationAssignmentUseCase {
  constructor(
    @inject("UsersRepo") private readonly usersRepo: UsersRepo,
    @inject("ConversationRepo") private readonly conversationRepo: ConversationRepo,
  ) {}

  async execute(
    conversationNewId: string,
    fullName: string,
    userType: TEndUserEnum,
  ): Promise<ResponseWithPagination<Participant>> {
    const conversation = await this.conversationRepo.findOneByNewIdOrThrow(
      conversationNewId,
      "notFound.conversation",
    );

    const participantIds = conversation.participants.map(participant => participant.user);

    const targetUsers = startConversationRules[userType];

    const users = await this.usersRepo.getUsersByFullName(fullName, targetUsers, participantIds);
    const paginatedUsers = paginateResult(users, 6);
    return paginatedUsers;
  }
}
