import { CommentDTO } from "../../../../../feature/announcements/dtos/comment.dto";
import { GetOneCommentValidation } from "./getOneComment.validation";

export type GetOneCommentRouteConfig = GetOneCommentValidation & { files: never };
export type GetOneCommentResponse = CommentDTO;
