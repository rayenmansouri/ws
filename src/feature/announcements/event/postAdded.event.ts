import { BaseEvent } from "../../../core/events/BaseEvent";
import { PostDTO } from "../dtos/posts.dto";
import { Users } from "../../../core/events/BaseEvent";

export type TPostAddedEventPayload = PostDTO;

export class PostAddedEvent extends BaseEvent {
  constructor(tenantId: string, payload: TPostAddedEventPayload) {
    super(tenantId, "NEW_POST_ADDED", payload);
  }

  sendEventToUsers(usersIdsWithType: Users): void {
    this.sendToUsers(usersIdsWithType);
  }
}
