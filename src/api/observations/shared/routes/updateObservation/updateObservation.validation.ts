import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    observationReason: validateNewId(),
    note: z.string(),
    deletedFiles: z.array(z.string()),
    students: z.array(validateNewId()),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  observationNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateObservationValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateObservationValidation = {
  body,
  params,
};
