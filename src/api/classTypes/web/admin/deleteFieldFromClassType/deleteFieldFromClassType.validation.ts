import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classTypeNewId: validateNewId(),
  fieldIndex: z.coerce.number().min(0),
});
type TParams = z.infer<typeof params>;

export type DeleteFieldFromClassTypeValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteFieldFromClassTypeValidation = {
  params,
};
