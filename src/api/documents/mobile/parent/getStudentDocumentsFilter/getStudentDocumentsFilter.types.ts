import { DocumentFilterDto } from "../../../../../feature/documents/dtos/document.dto";
import { GetStudentDocumentsFilterValidation } from "./getStudentDocumentsFilter.validation";

export type GetStudentDocumentsFilterRouteConfig = GetStudentDocumentsFilterValidation & {
  files: never;
};
export type GetStudentDocumentsFilterResponse = DocumentFilterDto;
