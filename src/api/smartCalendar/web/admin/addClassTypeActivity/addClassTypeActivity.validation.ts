import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const body = z.object({
  sessionType: validateID(),
  subjectType: validateID(),
  subSubjectType: validateID().optional(),
  perGroup: z.boolean().optional(),
  week: z.enum(["A", "B"]).optional(),
  durationInMinutes: z.number(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AddClassTypeActivityValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const addClassTypeActivityValidation = {
  body,
  params,
};
