import { TConversationNameUpdatedEventPayload } from "./../../feature/messages/events/updateConversationName.event";
import { TNewSeenEventPayload } from "./../../feature/messages/events/newSeen.event";
import { TNewReactionEventPayload } from "./../../feature/messages/events/newReaction.event";
import { TNewMessageEventPayload } from "../../feature/messages/events/newMessage.web.event";
import { TDeletedMessageEventPayload } from "../../feature/messages/events/deletedMessage.event";

export type EventEnum = keyof EventResponseMapping;

export type EventResponseMapping = {
  NEW_MESSAGE_ADDED: TNewMessageEventPayload;
  NEW_REACTION_ON_MESSAGE_ADDED: TNewReactionEventPayload;
  NEW_SEEN_ADDED: TNewSeenEventPayload;
  DELETED_MESSAGE: TDeletedMessageEventPayload;
  CONVERSATION_NAME_UPDATED: TConversationNameUpdatedEventPayload;
};
