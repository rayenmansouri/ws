import { z } from "zod";
import { validateDate, validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  date: validateDate().optional(),
  dateInterval: z
    .object({
      from: validateDate().optional(),
      to: validateDate().optional(),
    })
    .optional(),
  tabName: z.enum(["attendance", "observationGiven", "sessionCanceled"]).optional(),
});
type TQuery = z.infer<typeof query>;

export type GetClassDashboardValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getClassDashboardValidation = {
  params,
  query,
};
