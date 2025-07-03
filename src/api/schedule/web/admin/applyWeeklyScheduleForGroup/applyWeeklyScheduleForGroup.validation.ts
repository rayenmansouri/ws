import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  groupNewId: validateNewId(),
});
type TBody = z.infer<typeof body>;

export type ApplyWeeklyScheduleForGroupValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const applyWeeklyScheduleForGroupValidation = {
  body,
};
