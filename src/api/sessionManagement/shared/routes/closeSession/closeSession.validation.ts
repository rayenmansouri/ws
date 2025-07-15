import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";

const params = z.object({
  sessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type CloseSessionValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const closeSessionValidation = {
  params,
};
