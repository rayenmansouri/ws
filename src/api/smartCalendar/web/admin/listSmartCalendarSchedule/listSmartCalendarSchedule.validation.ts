import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = paginationOptionsValidation.merge(
  z.object({
    search: z.string().optional(),
  }),
);
type TQuery = z.infer<typeof query>;

export type ListSmartCalendarScheduleValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listSmartCalendarScheduleValidation = {
  query,
};
