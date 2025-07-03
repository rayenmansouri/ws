import { z } from "zod";
import { addSupplierValidation } from "../addSupplier/addSupplier.validation";
import { validateNewId } from "../../../../../core/validator";

const body = addSupplierValidation.body.partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  supplierNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;
export type UpdateSupplierValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSupplierValidation = {
  body,
  params,
};
