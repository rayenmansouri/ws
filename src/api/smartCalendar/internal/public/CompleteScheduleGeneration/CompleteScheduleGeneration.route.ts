import { registerRoute } from "../../../../../core/express/registerRoute";
import { CompleteScheduleGenerationController } from "./CompleteScheduleGeneration.controller";
import { CompleteScheduleGenerationRouteConfig } from "./CompleteScheduleGeneration.types";
import { CompleteScheduleGenerationValidation } from "./CompleteScheduleGeneration.validation";

registerRoute<CompleteScheduleGenerationRouteConfig>()({
  path: "/schedules/:scheduleId/complete",
  method: "post",
  bodySchema: CompleteScheduleGenerationValidation.body,
  paramSchema: CompleteScheduleGenerationValidation.params,
  querySchema: CompleteScheduleGenerationValidation.query,
  controller: CompleteScheduleGenerationController,
  isTransactionEnabled: true,
  platform: "internal",
  isPublic: true,
});
