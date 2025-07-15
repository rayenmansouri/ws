import { ClassTypeDto } from "../../../../../feature/classTypes/dtos/classType.dto";
import { AddClassTypeValidation } from "./addClassType.validation";

export type AddClassTypeRouteConfig = AddClassTypeValidation & { files: never };
export type AddClassTypeResponse = ClassTypeDto;
