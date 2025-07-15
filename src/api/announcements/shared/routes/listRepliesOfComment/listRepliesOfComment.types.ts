import { ReplyDTO } from "../../../../../feature/announcements/dtos/reply.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListRepliesOfCommentValidation } from "./listRepliesOfComment.validation";

export type ListRepliesOfCommentRouteConfig = ListRepliesOfCommentValidation & { files: never };
export type ListRepliesOfCommentResponse = ResponseWithPagination<ReplyDTO>;
