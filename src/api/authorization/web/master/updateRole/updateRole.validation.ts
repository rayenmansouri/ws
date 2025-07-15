import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { LANGUAGE_ENUM } from "../../../../../translation/constants";

const body = z.object({
  name: z.string().optional(),
  permissions: z.array(z.string()).optional(),
  translation: z
    .object({
      [LANGUAGE_ENUM.ARABIC]: z.string(),
      [LANGUAGE_ENUM.ENGLISH]: z.string(),
      [LANGUAGE_ENUM.FRENCH]: z.string(),
    })
    .optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  roleNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateRoleValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateRoleValidation = {
  body,
  params,
};
