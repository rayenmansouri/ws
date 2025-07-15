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

const query = z.object({});
type TQuery = z.infer<typeof query>;

export type ReorderSubjectsOfClassTypesValidation = {
  body: TBody;
  params: TParams;
  query: TQuery;
};

export const reorderSubjectsOfClassTypesValidation = {
  body,
  params,
  query,
};
