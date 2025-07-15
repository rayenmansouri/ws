import { ReactionsDTO } from "../../../../../feature/announcements/dtos/reactions.dto";
import { GetReactionsOfCommentValidation } from "./getReactionsOfComment.validation";

export type GetReactionsOfCommentRouteConfig = GetReactionsOfCommentValidation & { files: never };
export type GetReactionsOfCommentResponse = ReactionsDTO;
