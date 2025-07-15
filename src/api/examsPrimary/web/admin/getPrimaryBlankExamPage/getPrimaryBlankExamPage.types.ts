import { BlankExamPageDTO } from "../../../../../feature/examGrade/dto/BlankExamPage.dto";
import { GetPrimaryBlankExamPageValidation } from "./getPrimaryBlankExamPage.validation";

export type GetPrimaryBlankExamPageRouteConfig = GetPrimaryBlankExamPageValidation & {
  files: never;
};
export type GetPrimaryBlankExamPageResponse = BlankExamPageDTO;
