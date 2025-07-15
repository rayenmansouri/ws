import { ReactionsDTO } from "../../../../../feature/announcements/dtos/reactions.dto";
import { GetReactionsOfPostValidation } from "./getReactionsOfPost.validation";

export type GetReactionsOfPostRouteConfig = GetReactionsOfPostValidation & { files: never };
export type GetReactionsOfPostResponse = ReactionsDTO;
