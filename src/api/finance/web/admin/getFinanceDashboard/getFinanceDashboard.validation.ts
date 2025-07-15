import { z } from "zod";
import { validateDate, validateID } from "../../../../../core/validator";

const query = z.object({
  levels: z.array(validateID()),
  startDate: validateDate(),
  endDate: validateDate(),
});
type TQuery = z.infer<typeof query>;

export type GetFinanceDashboardValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getFinanceDashboardValidation = {
  query,
};
