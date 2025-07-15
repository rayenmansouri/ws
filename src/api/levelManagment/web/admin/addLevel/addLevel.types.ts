import { Level } from "../../../../../feature/levels/domains/level.entity";
import { AddLevelValidation } from "./addLevel.validation";

export type AddLevelRouteConfig = AddLevelValidation & { files: never };
export type AddLevelResponse = Level;
