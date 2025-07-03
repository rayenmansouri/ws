import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  roleNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteRoleValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteRoleValidation = {
  params,
};
