import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const params = z.object({
  scheduleId: validateID(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  schoolSubdomain: z.string(),
});
type TQuery = z.infer<typeof query>;

export type MarkScheduleAsErroredValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const MarkScheduleAsErroredValidation = {
  params,
  query,
};
