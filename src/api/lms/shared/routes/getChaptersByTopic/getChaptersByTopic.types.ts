import { ChapterDetailsDto } from "../../../../../feature/lms/dtos/Chapter.dto";
import { GetChaptersByTopicValidation } from "./getChaptersByTopic.validation";

export type GetChaptersByTopicRouteConfig = GetChaptersByTopicValidation & { files: never };
export type GetChaptersByTopicResponse = ChapterDetailsDto[];
