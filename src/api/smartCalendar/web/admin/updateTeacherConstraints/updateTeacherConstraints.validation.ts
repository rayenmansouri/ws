import { z } from "zod";
import { validateNewId, validateID } from "./../../../../../core/validator";

const body = z.object({
  preferredClassroom: validateID().optional(),
  maxDaysPerWeek: z.number().optional(),
  maxGapsPerDay: z.number().optional(),
  maxHoursPerDay: z.number().optional(),
});

type TBody = z.infer<typeof body>;

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateTeacherConstraintsValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateTeacherConstraintsValidation = {
  body,
  params,
};
