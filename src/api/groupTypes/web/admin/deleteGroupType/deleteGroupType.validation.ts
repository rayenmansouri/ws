import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  groupTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteGroupTypeValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteGroupTypeValidation = {
  params,
};
