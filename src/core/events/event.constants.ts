import { TConversationNameUpdatedEventPayload } from "./../../feature/messages/events/updateConversationName.event";
import { TNewSeenEventPayload } from "./../../feature/messages/events/newSeen.event";
import { TNewReactionEventPayload } from "./../../feature/messages/events/newReaction.event";
import { TNewMessageEventPayload } from "../../feature/messages/events/newMessage.web.event";
import { TReactOnCommentAddedPayload } from "../../feature/announcements/event/newReactOnCommentAdded.event";
import { TReplyOnCommentAddedPayload } from "../../feature/announcements/event/newReplyOnCommentAdded.event";
import { TNewCommentOnPostAddedPayload } from "../../feature/announcements/event/newCommentOnPostAdded.event";
import { TPostReactionUpdatedEventPayload } from "../../feature/announcements/event/postReactionsUpdated.event";
import { TPostAddedEventPayload } from "../../feature/announcements/event/postAdded.event";
import { TIssueActionPayload } from "../../feature/issues/events/issueAction.event";
import { TSendReplyEventPayload } from "../../feature/issues/events/replySent.event";
import { TIssueCreatedEventPayload } from "../../feature/issues/events/issueAdded.event";
import { TDeletedMessageEventPayload } from "../../feature/messages/events/deletedMessage.event";

export type EventEnum = keyof EventResponseMapping;

export type EventResponseMapping = {
  ISSUE_ADDED_EVENT: TIssueCreatedEventPayload;
  REPLY_SENT_EVENT: TSendReplyEventPayload;
  ISSUE_ACTION: TIssueActionPayload;
  NEW_POST_ADDED: TPostAddedEventPayload;
  NEW_REACTION_ON_POST_ADDED: TPostReactionUpdatedEventPayload;
  NEW_COMMENT_ON_POST_ADDED: TNewCommentOnPostAddedPayload;
  NEW_REPLY_ON_COMMENT_ADDED: TReplyOnCommentAddedPayload;
  NEW_REACTION_ON_COMMENT_ADDED: TReactOnCommentAddedPayload;
  NEW_MESSAGE_ADDED: TNewMessageEventPayload;
  NEW_REACTION_ON_MESSAGE_ADDED: TNewReactionEventPayload;
  NEW_SEEN_ADDED: TNewSeenEventPayload;
  DELETED_MESSAGE: TDeletedMessageEventPayload;
  CONVERSATION_NAME_UPDATED: TConversationNameUpdatedEventPayload;
};
