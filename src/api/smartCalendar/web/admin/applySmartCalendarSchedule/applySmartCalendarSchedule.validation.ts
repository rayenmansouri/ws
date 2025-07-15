import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  smartCalendarScheduleNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ApplySmartCalendarScheduleValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const applySmartCalendarScheduleValidation = {
  params,
};
