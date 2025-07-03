import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string().min(1),
  subjectTypeNewIds: z.array(validateNewId()),
  coefficient: z.number().positive(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classTypeNewId: validateNewId(),
  fieldRank: z.coerce.number().int(),
});
type TParams = z.infer<typeof params>;

export type UpdateFieldOfClassTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateFieldOfClassTypeValidation = {
  body,
  params,
};
