import { LevelDegreesCoverageDTO } from "../../../../../feature/examGrade/dto/LevelCoverage.dto";
import { GetLevelDegreesCoverageValidation } from "./getLevelDegreesCoverage.validation";

export type GetLevelDegreesCoverageRouteConfig = GetLevelDegreesCoverageValidation & {
  files: never;
};
export type GetLevelDegreesCoverageResponse = LevelDegreesCoverageDTO;
