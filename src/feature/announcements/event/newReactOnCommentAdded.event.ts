import { TEndUserEnum } from "../../../constants/globalEnums";
import { BaseEvent, platformType, Users } from "../../../core/events/BaseEvent";
import { ReactionSummary } from "../domain/Reactions.service";
import { TReactionTypeEnum } from "../domain/reaction.entity";

export type TReactOnCommentAddedPayload = {
  postId: string;
  postNewId: string;
  commentId: string;
  commentNewId: string;
  parentCommentId: string | null;
  parentCommentNewId: string | null;
  reacts: ReactionSummary;
  userReaction: TReactionTypeEnum | null;
  userNewId: string;
  userType: TEndUserEnum;
};

export class ReactOnCommentAddedEvent extends BaseEvent {
  constructor(tenantId: string, payload: TReactOnCommentAddedPayload) {
    super(tenantId, "NEW_REACTION_ON_COMMENT_ADDED", payload);
  }

  sendEventToUsers(usersIdsWithType: Users, platform?: platformType[]): void {
    this.sendToUsers(usersIdsWithType, platform);
  }
}
