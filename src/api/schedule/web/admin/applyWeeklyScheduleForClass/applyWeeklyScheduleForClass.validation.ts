import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  classNewId: validateNewId(),
});
type TBody = z.infer<typeof body>;

export type ApplyWeeklyScheduleForClassValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const applyWeeklyScheduleForClassValidation = {
  body,
};
