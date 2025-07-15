import { BaseEvent, platformType, Users } from "./../../../core/events/BaseEvent";
import { ID } from "./../../../types/BaseEntity";

export type TConversationNameUpdatedEventPayload = {
  conversationId: ID;
  conversationNewId: string;
  conversationName: string;
};

export class ConversationNameUpdatedEvent extends BaseEvent {
  constructor(tenantId: string, payload: TConversationNameUpdatedEventPayload) {
    super(tenantId, "CONVERSATION_NAME_UPDATED", payload);
  }

  sendEventToUsers(usersIdsWithType: Users, platforms: platformType[]): void {
    this.sendToUsers(usersIdsWithType, platforms);
  }
}
