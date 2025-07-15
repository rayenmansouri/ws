import { Diploma } from "../../../../../feature/diploma/diploma.entity";
import { AddDiplomaValidation } from "./addDiploma.validation";

export type AddDiplomaRouteConfig = AddDiplomaValidation & { files: never };
export type AddDiplomaResponse = Diploma;
