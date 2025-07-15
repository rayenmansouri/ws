import { BaseEvent, Users } from "../../../core/events/BaseEvent";
import { ID } from "../../../types/BaseEntity";

export type TDeletedMessageEventPayload = {
  messageNewId: string;
  messageId: ID;
  conversationNewId: string;
  conversationId: ID;
};

export class DeletedMessageEvent extends BaseEvent {
  constructor(tenantId: string, payload: TDeletedMessageEventPayload) {
    super(tenantId, "DELETED_MESSAGE", payload);
  }

  sendEventToUsers(usersIdsWithType: Users): void {
    this.sendToUsers(usersIdsWithType, ["mobile", "web"]);
  }
}
