import { registerRoute } from "../../../../../core/express/registerRoute";
import { MarkScheduleAsErroredController } from "./MarkScheduleAsErrored.controller";
import { MarkScheduleAsErroredRouteConfig } from "./MarkScheduleAsErrored.types";
import { MarkScheduleAsErroredValidation } from "./MarkScheduleAsErrored.validation";

registerRoute<MarkScheduleAsErroredRouteConfig>()({
  path: "/schedules/:scheduleId/mark-as-errored",
  method: "post",
  paramSchema: MarkScheduleAsErroredValidation.params,
  querySchema: MarkScheduleAsErroredValidation.query,
  controller: MarkScheduleAsErroredController,
  isTransactionEnabled: false,
  isPublic: true,
  platform: "internal",
});
