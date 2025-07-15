import { CommentDTO } from "../../../../../feature/announcements/dtos/comment.dto";
import { FilesInRequest } from "../../../../../types/app-request";
import { AddCommentToPostValidation } from "./addCommentToPost.validation";

export type AddCommentToPostRouteConfig = AddCommentToPostValidation & {
  files: FilesInRequest<"attachments">;
};
export type AddCommentToPostResponse = CommentDTO;
