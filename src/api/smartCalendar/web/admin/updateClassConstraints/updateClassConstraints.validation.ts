import { validateNewId, validateID } from "./../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  preferredClassroom: validateID().optional(),
  maxHoursPerDay: z.number().optional(),
  maxContinuousHours: z.number().optional(),
  maxGapsPerDay: z.number().optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateClassConstraintsValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateClassConstraintsValidation = {
  body,
  params,
};
