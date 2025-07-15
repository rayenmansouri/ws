import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  newIds: z.array(validateNewId()),
});
type TBody = z.infer<typeof body>;

export type DeleteSuppliersValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const deleteSuppliersValidation = {
  body,
};
