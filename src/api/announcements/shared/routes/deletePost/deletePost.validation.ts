import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  postNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeletePostValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deletePostValidation = {
  params,
};
