import { ChapterAttachmentDto } from "../../../../../feature/lms/dtos/ChapterAttachment.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListChapterAttachmentsValidation } from "./listChapterAttachments.validation";

export type ListChapterAttachmentsRouteConfig = ListChapterAttachmentsValidation & { files: never };
export type ListChapterAttachmentsResponse = ResponseWithPagination<ChapterAttachmentDto>;
