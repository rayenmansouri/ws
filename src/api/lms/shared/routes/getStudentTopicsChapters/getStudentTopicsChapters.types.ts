import { topicChapterDto } from "../../../../../feature/lms/dtos/Chapter.dto";
import { GetStudentTopicsChaptersValidation } from "./getStudentTopicsChapters.validation";

export type GetStudentTopicsChaptersRouteConfig = GetStudentTopicsChaptersValidation & {
  files: never;
};
export type GetStudentTopicsChaptersResponse = topicChapterDto[];
