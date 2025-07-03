import { InteractionDTO } from "./../../../../../feature/issues/dtos/interaction.dto";
import { FilesInRequest } from "./../../../../../types/app-request";
import { SendReplyValidation } from "./sendReply.validation";

export type SendReplyRouteConfig = SendReplyValidation & { files: FilesInRequest<"attachments"> };
export type SendReplyResponse = InteractionDTO;
