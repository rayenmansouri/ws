import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const params = z.object({
  alertNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetAlertDetailsValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getAlertDetailsValidation = {
  params,
};
