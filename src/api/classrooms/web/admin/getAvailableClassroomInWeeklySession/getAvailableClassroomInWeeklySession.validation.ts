import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  startTime: z.object({
    day: z.number(),
    hours: z.number(),
    minutes: z.number(),
  }),
  endTime: z.object({
    day: z.number(),
    hours: z.number(),
    minutes: z.number(),
  }),
  weeklySessionNewId: validateNewId().optional(),
  week: z.enum(["A", "B"]).optional(),
});
type TQuery = z.infer<typeof query>;

export type GetAvailableClassroomInWeeklySessionValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getAvailableClassroomInWeeklySessionValidation = {
  query,
};
