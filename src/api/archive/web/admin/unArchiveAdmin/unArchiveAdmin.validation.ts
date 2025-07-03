import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";

const params = z.object({
  adminNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UnArchiveAdminValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const unArchiveAdminValidation = {
  params,
};
