import { GradesOfFieldDTO } from "../../../../../feature/examGrade/dto/primary/GradesOfField.dto";
import { GetGradesOfFieldValidation } from "./getGradesOfField.validation";

export type GetGradesOfFieldRouteConfig = GetGradesOfFieldValidation & { files: never };
export type GetGradesOfFieldResponse = GradesOfFieldDTO;
