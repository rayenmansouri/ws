import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  invoiceNewId: validateNewId(),
  splitIndex: z.coerce.number().min(0),
});
type TParams = z.infer<typeof params>;

export type UnpaySplitValidation = {
  params: TParams;
  query: never;
  body: never;
};

export const unpaySplitValidation = {
  params,
};
