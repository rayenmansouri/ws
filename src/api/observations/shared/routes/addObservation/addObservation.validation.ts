import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const body = z.object({
  students: z.array(validateNewId()).min(1),
  note: z.string(),
  session: validateID().optional(),
  observationReason: validateNewId(),
  classNewId: validateNewId().optional(),
  groupNewId: validateNewId().optional(),
});

type TBody = z.infer<typeof body>;

export type AddObservationValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addObservationValidation = {
  body,
};
