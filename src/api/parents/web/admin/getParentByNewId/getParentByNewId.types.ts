import { ParentDetailsDTO } from "../../../../../feature/parents/dtos/Parent.dto";
import { GetParentByNewIdValidation } from "./getParentByNewId.validation";

export type GetParentByNewIdRouteConfig = GetParentByNewIdValidation & { files: never };
export type GetParentByNewIdResponse = ParentDetailsDTO;
