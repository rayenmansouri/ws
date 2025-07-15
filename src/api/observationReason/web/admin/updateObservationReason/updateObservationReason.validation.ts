import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string(),
    urgency: z.enum(["high", "medium", "low"]),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  observationReasonNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateObservationReasonValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateObservationReasonValidation = {
  body,
  params,
};
