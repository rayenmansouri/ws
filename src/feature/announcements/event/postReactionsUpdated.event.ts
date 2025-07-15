import { TEndUserEnum } from "../../../constants/globalEnums";
import { BaseEvent, platformType } from "../../../core/events/BaseEvent";
import { ReactionSummary } from "../domain/Reactions.service";
import { ID } from "../../../types/BaseEntity";
import { TReactionTypeEnum } from "../domain/reaction.entity";
import { Users } from "../../../core/events/BaseEvent";

export type TPostReactionUpdatedEventPayload = {
  postId: ID;
  postNewId: string;
  reactionSummary: ReactionSummary;
  userReaction: TReactionTypeEnum | null | undefined;
  userNewId: string;
  userType: TEndUserEnum;
};

export class PostReactionUpdatedEvent extends BaseEvent {
  constructor(tenantId: string, payload: TPostReactionUpdatedEventPayload) {
    super(tenantId, "NEW_REACTION_ON_POST_ADDED", payload);
  }

  sendEventToUsers(usersIdsWithType: Users, platform?: platformType[]): void {
    this.sendToUsers(usersIdsWithType, platform);
  }
}
