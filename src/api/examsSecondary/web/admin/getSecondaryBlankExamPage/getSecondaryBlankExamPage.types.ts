import { BlankExamPageDTO } from "../../../../../feature/examGrade/dto/BlankExamPage.dto";
import { GetSecondaryBlankExamPageValidation } from "./getSecondaryBlankExamPage.validation";

export type GetSecondaryBlankExamPageRouteConfig = GetSecondaryBlankExamPageValidation & {
  files: never;
};
export type GetSecondaryBlankExamPageResponse = BlankExamPageDTO;
