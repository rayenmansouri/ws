import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  observationReasonNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteObservationReasonValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteObservationReasonValidation = {
  params,
};
