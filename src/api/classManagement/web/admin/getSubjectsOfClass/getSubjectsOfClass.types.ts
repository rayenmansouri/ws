import { SubjectOfClassDto } from "../../../../../feature/classes/dto/SubjectOfClass.dto";
import { GetSubjectsOfClassValidation } from "./getSubjectsOfClass.validation";

export type GetSubjectsOfClassRouteConfig = GetSubjectsOfClassValidation & { files: never };
export type GetSubjectsOfClassResponse = SubjectOfClassDto[];
