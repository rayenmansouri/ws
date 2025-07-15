import { LevelOverviewDto } from "../../../../../feature/levels/dto/LevelOverview.dto";
import { GetLevelsOverviewValidation } from "./getLevelsOverview.validation";

export type GetLevelsOverviewRouteConfig = GetLevelsOverviewValidation & { files: never };
export type GetLevelsOverviewResponse = LevelOverviewDto[];
