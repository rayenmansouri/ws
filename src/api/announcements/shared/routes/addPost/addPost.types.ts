import { PostDTO } from "../../../../../feature/announcements/dtos/posts.dto";
import { FilesInRequest } from "../../../../../types/app-request";
import { AddPostValidation } from "./addPost.validation";

export type AddPostRouteConfig = AddPostValidation & { files: FilesInRequest<"attachments"> };
export type AddPostResponse = PostDTO;
