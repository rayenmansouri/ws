import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  newRank: z.number().int(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  examTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ReorderExamTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const reorderExamTypeValidation = {
  body,
  params,
};
