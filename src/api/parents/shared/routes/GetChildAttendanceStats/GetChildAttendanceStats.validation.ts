import { z } from "zod";
import { validateNewId, validateDate } from "./../../../../../core/validator";

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  from: validateDate(),
  to: validateDate(),
});
type TQuery = z.infer<typeof query>;

export type GetChildAttendanceStatsValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const GetChildAttendanceStatsValidation = {
  params,
  query,
};
