import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  termNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteTermValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteTermValidation = {
  params,
};
