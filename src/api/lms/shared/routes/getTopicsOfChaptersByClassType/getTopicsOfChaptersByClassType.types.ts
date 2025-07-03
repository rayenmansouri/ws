import { topicChapterDto } from "../../../../../feature/lms/dtos/Chapter.dto";
import { GetTopicsOfChaptersByClassTypeValidation } from "./getTopicsOfChaptersByClassType.validation";

export type GetTopicsOfChaptersByClassTypeRouteConfig = GetTopicsOfChaptersByClassTypeValidation & {
  files: never;
};
export type GetTopicsOfChaptersByClassTypeResponse = topicChapterDto[];
