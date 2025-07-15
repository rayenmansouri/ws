import { GetMessagesReactionsDto } from "./../../../../../feature/messages/dtos/GetMessagesReactions.dto";

import { GetMessageReactionsValidation } from "./GetMessageReactions.validation";

export type GetMessageReactionsRouteConfig = GetMessageReactionsValidation & { files: never };
export type GetMessageReactionsResponse = GetMessagesReactionsDto[];
