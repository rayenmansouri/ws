import { EntityDto } from "../../../../../feature/entity/dto/entity.dto";
import { GetAvailableClassroomInWeeklySessionValidation } from "./getAvailableClassroomInWeeklySession.validation";

export type GetAvailableClassroomInWeeklySessionRouteConfig =
  GetAvailableClassroomInWeeklySessionValidation & { files: never };
export type GetAvailableClassroomInWeeklySessionResponse = EntityDto[];
