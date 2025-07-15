import { Diploma } from "../../../../../feature/diploma/diploma.entity";
import { UpdateDiplomaValidation } from "./updateDiploma.validation";

export type UpdateDiplomaRouteConfig = UpdateDiplomaValidation & { files: never };
export type UpdateDiplomaResponse = Diploma;
