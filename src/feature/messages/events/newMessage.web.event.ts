import { ConversationDTO } from "../dtos/Conversation.dto";
import { MessageDTO } from "../dtos/Message.dto";
import { BaseEvent } from "../../../core/events/BaseEvent";
import { Users } from "../../../core/events/BaseEvent";

export type TNewMessageEventPayload = {
  message: MessageDTO;
  conversation: ConversationDTO;
};

export class NewMessageAddedWebEvent extends BaseEvent {
  constructor(tenantId: string, payload: TNewMessageEventPayload) {
    super(tenantId, "NEW_MESSAGE_ADDED", payload);
  }

  sendEventToUsers(usersIdsWithType: Users): void {
    this.sendToUsers(usersIdsWithType);
  }
}
