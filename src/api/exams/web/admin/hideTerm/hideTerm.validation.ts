import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
  termId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type HideTermValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const hideTermValidation = {
  params,
};
