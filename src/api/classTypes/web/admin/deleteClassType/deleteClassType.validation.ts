import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteClassTypeValidation = {
  params: TParams;
  body: never;
  query: never;
};

export const deleteClassTypeValidation = {
  params,
};
