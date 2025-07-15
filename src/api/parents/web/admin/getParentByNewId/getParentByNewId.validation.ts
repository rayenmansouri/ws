import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  parentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetParentByNewIdValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getParentByNewIdValidation = {
  params,
};
