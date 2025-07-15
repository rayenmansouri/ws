import { BlankExamPageDTO } from "../../../../../feature/examGrade/dto/BlankExamPage.dto";
import { GetCambridgeBlankExamPageValidation } from "./getCambridgeBlankExamPage.validation";

export type GetCambridgeBlankExamPageRouteConfig = GetCambridgeBlankExamPageValidation & {
  files: never;
};
export type GetCambridgeBlankExamPageResponse = BlankExamPageDTO;
