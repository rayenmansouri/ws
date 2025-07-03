import { z } from "zod";
import { OBSERVATION_URGENCY_ENUM } from "../../../../../feature/observationsReason/domains/observationReason.entity";

const body = z.object({
  name: z.string().min(1),
  urgency: z.nativeEnum(OBSERVATION_URGENCY_ENUM),
});
type TBody = z.infer<typeof body>;

export type AddObservationReasonValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addObservationReasonValidation = {
  body,
};
