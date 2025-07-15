import { PostDTO } from "../../../../../feature/announcements/dtos/posts.dto";
import { GetOnePostValidation } from "./getOnePost.validation";

export type GetOnePostRouteConfig = GetOnePostValidation & { files: never };
export type GetOnePostResponse = PostDTO;
