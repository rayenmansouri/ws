import { PostDTO } from "../../../../../feature/announcements/dtos/posts.dto";
import { FilesInRequest } from "../../../../../types/app-request";
import { UpdatePostValidation } from "./updatePost.validation";

export type UpdatePostRouteConfig = UpdatePostValidation & {
  files: FilesInRequest<"attachments">;
};
export type UpdatePostResponse = PostDTO;
