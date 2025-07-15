import { DocumentDto } from "../../../../../feature/documents/dtos/document.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListDocumentsOfStudentValidation } from "./listDocumentsOfStudent.validation";

export type ListDocumentsOfStudentRouteConfig = ListDocumentsOfStudentValidation & { files: never };
export type ListDocumentsOfStudentResponse = ResponseWithPagination<DocumentDto>;
