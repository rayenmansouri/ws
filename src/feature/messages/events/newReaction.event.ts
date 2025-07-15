import { BaseEvent, Users } from "./../../../core/events/BaseEvent";
import { platformType } from "./../../../core/events/BaseEvent";
import { ID } from "./../../../types/BaseEntity";
import { TMessageReactionTypeEnum } from "../domain/message.entity";

export type TNewReactionEventPayload = {
  messageId: ID;
  reactions: { reactionType: TMessageReactionTypeEnum | null; userId: ID }[];
};

export class NewReactionAddedEvent extends BaseEvent {
  constructor(tenantId: string, payload: TNewReactionEventPayload) {
    super(tenantId, "NEW_REACTION_ON_MESSAGE_ADDED", payload);
  }

  sendEventToUsers(usersIdsWithType: Users, platforms: platformType[]): void {
    this.sendToUsers(usersIdsWithType, platforms);
  }
}
