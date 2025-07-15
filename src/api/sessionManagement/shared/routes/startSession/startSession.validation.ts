import { validateNewId } from "./../../../../../core/validator";

import { z } from "zod";

const params = z.object({
  sessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type StartSessionValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const startSessionValidation = {
  params,
};
