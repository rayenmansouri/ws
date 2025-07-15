import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  oldRank: z.number().int(),
  newRank: z.number().int(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ReorderFieldsOfClassTypesValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const reorderFieldsOfClassTypesValidation = {
  params,
  body,
};
