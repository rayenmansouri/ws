import { BaseEvent, platformType, Users } from "../../../core/events/BaseEvent";
import { ReplyDTO } from "../dtos/reply.dto";

export type TReplyOnCommentAddedPayload = ReplyDTO & {
  parentCommentNewId: string;
};

export class ReplyOnCommentAddedEvent extends BaseEvent {
  constructor(tenantId: string, payload: TReplyOnCommentAddedPayload) {
    super(tenantId, "NEW_REPLY_ON_COMMENT_ADDED", payload);
  }

  sendEventToUsers(usersIdsWithType: Users, platform?: platformType[]): void {
    this.sendToUsers(usersIdsWithType, platform);
  }
}
