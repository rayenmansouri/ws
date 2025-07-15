import { ReplyDTO } from "../../../../../feature/announcements/dtos/reply.dto";
import { FilesInRequest } from "../../../../../types/app-request";
import { AddReplyToCommentValidation } from "./addReplyToComment.validation";

export type AddReplyToCommentRouteConfig = AddReplyToCommentValidation & {
  files: FilesInRequest<"attachments">;
};
export type AddReplyToCommentResponse = ReplyDTO;
