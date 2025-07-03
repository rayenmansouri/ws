import { ChapterAttachmentDto } from "../../../../../feature/lms/dtos/ChapterAttachment.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListChapterVideoValidation } from "./listChapterVideo.validation";

export type ListChapterVideoRouteConfig = ListChapterVideoValidation & { files: never };
export type ListChapterVideoResponse = ResponseWithPagination<ChapterAttachmentDto>;
