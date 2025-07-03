import { z } from "zod";
import { SCHEDULE_ENTITY_ENUM } from "../../../../../helpers/constants";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  entity: z.nativeEnum(SCHEDULE_ENTITY_ENUM),
  newId: validateNewId(),
});
type TQuery = z.infer<typeof query>;

export type GetWeeklyScheduleValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getWeeklyScheduleValidation = {
  query,
};
