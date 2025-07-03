import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string(),
  hasSections: z.boolean(),
  levelNewId: validateNewId(),
});
type TBody = z.infer<typeof body>;

export type AddSubLevelValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addSubLevelValidation = {
  body,
};
