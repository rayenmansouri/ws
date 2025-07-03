import { z } from "zod";
import { SCHEDULE_ENTITY_ENUM } from "../../../../../helpers/constants";
import { validateDate, validateNewId } from "../../../../../core/validator";

const query = z.object({
  entity: z.nativeEnum(SCHEDULE_ENTITY_ENUM),
  newId: validateNewId(),
  startDate: validateDate(),
  endDate: validateDate(),
});
type TQuery = z.infer<typeof query>;

export type GetScheduleValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getScheduleValidation = {
  query,
};
