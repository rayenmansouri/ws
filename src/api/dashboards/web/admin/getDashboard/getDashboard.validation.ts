import { paginationOptionsValidation } from "./../../../../../core/validator";
import { z } from "zod";
import { validateID, validateDate } from "./../../../../../core/validator";

const query = z
  .object({
    levels: z.array(validateID()).optional(),
    dateInterval: z.object({
      from: validateDate(),
      to: validateDate(),
    }),
    search: z.string().optional(),
    tabName: z.enum(["attendance", "observationGiven", "sessionCanceled"]).default("attendance"),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type GetDashboardValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getDashboardValidation = {
  query,
};
