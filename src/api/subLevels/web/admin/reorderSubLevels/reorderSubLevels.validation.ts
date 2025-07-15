import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  newRank: z.number().int(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  subLevelNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ReorderSubLevelsValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const reorderSubLevelsValidation = {
  body,
  params,
};
