import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  expenses: z.array(validateNewId()),
  name: z.string().min(1),
  fiscalCode: z.string().min(1).optional(),
});
type TBody = z.infer<typeof body>;

export type AddSupplierValidation = {
  body: TBody;
  query: never;
  params: never;
};

export const addSupplierValidation = {
  body,
};
