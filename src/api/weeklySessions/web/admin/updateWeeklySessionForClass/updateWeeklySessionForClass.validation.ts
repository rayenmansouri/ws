import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    sessionTypeNewId: validateNewId(),
    startTime: z.object({
      day: z.number().min(0).max(6),
      hours: z.number().min(0).max(23),
      minutes: z.number().min(0).max(59),
    }),
    endTime: z.object({
      day: z.number().min(0).max(6),
      hours: z.number().min(0).max(23),
      minutes: z.number().min(0).max(59),
    }),
    classroomNewId: validateNewId(),
    classGroupNewId: validateNewId(),
    week: z.enum(["A", "B"]),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  weeklySessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateWeeklySessionForClassValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateWeeklySessionForClassValidation = {
  body,
  params,
};
