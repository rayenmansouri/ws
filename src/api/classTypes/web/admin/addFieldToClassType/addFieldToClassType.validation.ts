import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string(),
  subjectTypeNewIds: z.array(validateNewId()).min(1),
  coefficient: z.number().positive(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AddFieldToClassTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const addFieldToClassTypeValidation = {
  body,
  params,
};
