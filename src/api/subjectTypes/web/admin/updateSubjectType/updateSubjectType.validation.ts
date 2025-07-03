import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string().min(1),
    preferredStartingHours: z.array(z.number()),
    illustration: z.string().optional(),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  subjectTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSubjectTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSubjectTypeValidation = {
  body,
  params,
};
