import { FilesInRequest } from "../../../../../types/app-request";
import { AddChapterAttachmentValidation } from "./addChapterAttachment.validation";

export type AddChapterAttachmentRouteConfig = AddChapterAttachmentValidation & {
  files: FilesInRequest<"files">;
};
export type AddChapterAttachmentResponse = void;
