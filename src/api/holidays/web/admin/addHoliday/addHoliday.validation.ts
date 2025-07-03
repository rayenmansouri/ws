import { z } from "zod";
import { validateDate } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string().min(1),
    startDate: validateDate(),
    endDate: validateDate(),
    levelNewIds: z.array(z.string()),
    isDeletionOfSessionDisabled: z.boolean(),
  })
  .refine(value => value.startDate <= value.endDate, "Invalid start and end date");
type TBody = z.infer<typeof body>;

export type AddHolidayValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addHolidayValidation = {
  body,
};
