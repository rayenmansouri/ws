import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  oldRank: z.number().int(),
  newRank: z.number().int(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classTypeNewId: validateNewId(),
  subjectTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ReorderSubSubjectsOfClassTypesValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const reorderSubSubjectsOfClassTypesValidation = {
  body,
  params,
};
