import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  holidayNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteHolidayValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteHolidayValidation = {
  params,
};
