import { ChapterAttachmentDto } from "../../../../../feature/lms/dtos/ChapterAttachment.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListChapterDocumentsValidation } from "./listChapterDocuments.validation";

export type ListChapterDocumentsRouteConfig = ListChapterDocumentsValidation & { files: never };
export type ListChapterDocumentsResponse = ResponseWithPagination<ChapterAttachmentDto>;
