import { z } from "zod";
import { validateDate, validateNewId } from "../../../../../core/validator";

const query = z.object({
  startTime: validateDate(),
  endTime: validateDate(),
  sessionNewId: validateNewId().optional(),
  week: z.enum(["A", "B"]).optional(),
});
type TQuery = z.infer<typeof query>;

export type GetAvailableClassroomValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getAvailableClassroomValidation = {
  query,
};
