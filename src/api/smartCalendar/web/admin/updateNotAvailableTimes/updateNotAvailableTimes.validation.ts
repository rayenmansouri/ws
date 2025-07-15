import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const body = z.object({
  newId: validateNewId().optional(),
  entity: z.enum(["teacher", "school", "class"]),
  notAvailableTimes: z
    .array(
      z.object({
        day: z.number().min(0).max(6),
        hours: z.array(z.number().min(8).max(18)),
        isAvailable: z.boolean(),
      }),
    )
    .optional(),
});
type TBody = z.infer<typeof body>;

export type UpdateNotAvailableTimesValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const updateNotAvailableTimesValidation = {
  body,
};
