import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const validateTime = z.object({
  day: z.number().min(0).max(6),
  hours: z.number().min(0).max(23),
  minutes: z.number().min(0).max(59),
});
const body = z.object({
  startTime: validateTime,
  endTime: validateTime,
  sessionTypeNewId: validateNewId(),
  classroomNewId: validateNewId(),
  groupNewId: validateNewId(),
  week: z.enum(["A", "B"]).optional(),
});
type TBody = z.infer<typeof body>;

export type AddWeeklySessionForGroupValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addWeeklySessionForGroupValidation = {
  body,
};
