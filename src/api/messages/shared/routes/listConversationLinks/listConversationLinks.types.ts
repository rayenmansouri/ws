import { MessageLinkDTO } from "./../../../../../feature/messages/dtos/Message.dto";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";

import { ListConversationLinksValidation } from "./listConversationLinks.validation";

export type ListConversationLinksRouteConfig = ListConversationLinksValidation & { files: never };
export type ListConversationLinksResponse = ResponseWithPagination<MessageLinkDTO>;
