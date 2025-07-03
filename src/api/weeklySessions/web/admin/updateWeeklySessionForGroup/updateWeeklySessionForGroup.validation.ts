import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const validatePeriod = z.object({
  day: z.number().min(0).max(6),
  hours: z.number().min(0).max(23),
  minutes: z.number().min(0).max(59),
});
const body = z
  .object({
    startTime: validatePeriod,
    endTime: validatePeriod,
    classroomNewId: validateNewId(),
    week: z.enum(["A", "B"]).nullable(),
    sessionTypeNewId: validateNewId(),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  weeklySessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateWeeklySessionForGroupValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateWeeklySessionForGroupValidation = {
  body,
  params,
};
