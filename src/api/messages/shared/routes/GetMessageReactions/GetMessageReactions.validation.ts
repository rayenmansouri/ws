import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";

const params = z.object({
  messageNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetMessageReactionsValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const GetMessageReactionsValidation = {
  params,
};
