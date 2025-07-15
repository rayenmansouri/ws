import { SubjectOfClassTypeDTO } from "../../../../../feature/classTypes/dtos/classType.dto";
import { GetSubjectsOfClassTypesValidation } from "./getSubjectsOfClassTypes.validation";

export type GetSubjectsOfClassTypesRouteConfig = GetSubjectsOfClassTypesValidation & {
  files: never;
};
export type GetSubjectsOfClassTypesResponse = SubjectOfClassTypeDTO[];
