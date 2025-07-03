import { topicChapterDto } from "../../../../../feature/lms/dtos/Chapter.dto";
import { GetGroupTypesOfChaptersValidation } from "./getGroupTypesOfChapters.validation";

export type GetGroupTypesOfChaptersRouteConfig = GetGroupTypesOfChaptersValidation & {
  files: never;
};
export type GetGroupTypesOfChaptersResponse = topicChapterDto[];
