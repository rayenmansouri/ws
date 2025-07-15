import { FilesInRequest } from "../../../../../types/app-request";
import { UpdateChapterAttachmentValidation } from "./updateChapterAttachment.validation";

export type UpdateChapterAttachmentRouteConfig = UpdateChapterAttachmentValidation & {
  files: FilesInRequest<"files">;
};
export type UpdateChapterAttachmentResponse = void;
