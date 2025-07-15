import { z } from "zod";
import { validateDate, validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string(),
    isDeletionOfSessionDisabled: z.boolean(),
  })
  .partial()
  .merge(z.object({ startDate: validateDate(), endDate: validateDate() }));

type TBody = z.infer<typeof body>;

const params = z.object({
  holidayNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateHolidayValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateHolidayValidation = {
  body,
  params,
};
