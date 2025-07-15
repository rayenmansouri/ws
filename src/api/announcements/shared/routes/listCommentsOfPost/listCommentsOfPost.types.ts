import { CommentDTO } from "../../../../../feature/announcements/dtos/comment.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListCommentsOfPostValidation } from "./listCommentsOfPost.validation";

export type ListCommentsOfPostRouteConfig = ListCommentsOfPostValidation & { files: never };
export type ListCommentsOfPostResponse = ResponseWithPagination<CommentDTO>;
