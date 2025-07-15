import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  smartCalendarScheduleNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteSmartCalendarScheduleValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteSmartCalendarScheduleValidation = {
  params,
};
