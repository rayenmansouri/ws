import { ClassType } from "../../../../../feature/classTypes/repo/classType.entity";
import { GetClassTypeValidation } from "./getClassType.validation";

export type GetClassTypeRouteConfig = GetClassTypeValidation & { files: never };
export type GetClassTypeResponse = Pick<ClassType, "newId" | "_id" | "name">;
