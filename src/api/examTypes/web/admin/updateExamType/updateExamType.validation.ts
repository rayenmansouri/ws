import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string().min(1).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  examTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateExamTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateExamTypeValidation = {
  body,
  params,
};
