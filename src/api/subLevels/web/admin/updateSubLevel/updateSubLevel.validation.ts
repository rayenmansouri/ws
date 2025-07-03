import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string(),
  hasSections: z.boolean(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  subLevelNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSubLevelValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSubLevelValidation = {
  body,
  params,
};
