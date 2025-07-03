import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const params = z.object({
  messageNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteMessageValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteMessageValidation = {
  params,
};
