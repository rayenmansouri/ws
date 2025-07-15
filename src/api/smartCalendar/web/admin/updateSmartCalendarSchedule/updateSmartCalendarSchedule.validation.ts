import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string().optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  smartCalendarScheduleNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSmartCalendarScheduleValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSmartCalendarScheduleValidation = {
  body,
  params,
};
