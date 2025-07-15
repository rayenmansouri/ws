import { ConversationDTO } from "./../dtos/Conversation.dto";
import { BaseEvent, Users } from "./../../../core/events/BaseEvent";
import { platformType } from "./../../../core/events/BaseEvent";
import { ID } from "./../../../types/BaseEntity";
import { MessageDTO } from "../dtos/Message.dto";

export type TNewSeenEventPayload = {
  conversation: ConversationDTO;
  message: MessageDTO;
  userId: ID;
  avatar: string;
};

export class NewSeenAddedEvent extends BaseEvent {
  constructor(tenantId: string, payload: TNewSeenEventPayload) {
    super(tenantId, "NEW_SEEN_ADDED", payload);
  }

  sendEventToUsers(usersIdsWithType: Users, platforms: platformType[]): void {
    this.sendToUsers(usersIdsWithType, platforms);
  }
}
