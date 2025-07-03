import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetFieldsOfClassTypeValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getFieldsOfClassTypeValidation = {
  params,
};
