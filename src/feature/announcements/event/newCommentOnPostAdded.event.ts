import { BaseEvent, platformType, Users } from "../../../core/events/BaseEvent";
import { CommentDTO } from "../dtos/comment.dto";
import { ID } from "../../../types/BaseEntity";

export type TNewCommentOnPostAddedPayload = { postId: ID; comment: CommentDTO };

export class CommentOnPostAddedEvent extends BaseEvent {
  constructor(tenantId: string, payload: TNewCommentOnPostAddedPayload) {
    super(tenantId, "NEW_COMMENT_ON_POST_ADDED", payload);
  }

  sendEventToUsers(usersIdsWithType: Users, platform?: platformType[]): void {
    this.sendToUsers(usersIdsWithType, platform);
  }
}
