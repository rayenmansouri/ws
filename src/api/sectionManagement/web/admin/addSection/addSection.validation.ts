import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string().min(1),
  subLevelNewIds: z.array(validateNewId()),
});
type TBody = z.infer<typeof body>;

export type AddSectionValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addSectionValidation = {
  body,
};
