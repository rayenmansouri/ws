import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  newIds: z.array(validateNewId()).min(1),
});
type TBody = z.infer<typeof body>;

export type DeleteDiplomaValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const deleteDiplomaValidation = {
  body,
};
