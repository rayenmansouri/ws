import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  roleNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetOneRoleValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getOneRoleValidation = {
  params,
};
