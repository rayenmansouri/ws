import { PostDTO } from "../../../../../feature/announcements/dtos/posts.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListPostsValidation } from "./listPosts.validation";

export type ListPostsRouteConfig = ListPostsValidation & { files: never };
export type ListPostsResponse = ResponseWithPagination<PostDTO>;
