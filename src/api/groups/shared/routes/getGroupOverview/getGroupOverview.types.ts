import { GroupOverviewDTO } from "../../../../../feature/groupManagement/dtos/GroupOverview.dto";
import { GetGroupOverviewValidation } from "./getGroupOverview.validation";

export type GetGroupOverviewRouteConfig = GetGroupOverviewValidation & {
  files: never;
};
export type GetGroupOverviewResponse = GroupOverviewDTO;
