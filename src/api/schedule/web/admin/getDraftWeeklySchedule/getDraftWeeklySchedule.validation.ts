import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { SCHEDULE_ENTITY_ENUM } from "../../../../../helpers/constants";

const query = z.object({
  entity: z.nativeEnum(SCHEDULE_ENTITY_ENUM),
  newId: validateNewId(),
});
type TQuery = z.infer<typeof query>;

export type GetDraftWeeklyScheduleValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getDraftWeeklyScheduleValidation = {
  query,
};
