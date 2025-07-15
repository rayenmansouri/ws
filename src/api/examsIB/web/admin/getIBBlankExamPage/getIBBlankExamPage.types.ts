import { BlankExamPageDTO } from "../../../../../feature/examGrade/dto/BlankExamPage.dto";
import { GetIBBlankExamPageValidation } from "./getIBBlankExamPage.validation";

export type GetIBBlankExamPageRouteConfig = GetIBBlankExamPageValidation & { files: never };
export type GetIBBlankExamPageResponse = BlankExamPageDTO;
