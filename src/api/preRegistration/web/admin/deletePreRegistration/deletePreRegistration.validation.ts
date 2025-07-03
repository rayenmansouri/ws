import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const params = z.object({
  preRegistrationId: validateID(),
});
type TParams = z.infer<typeof params>;

export type DeletePreRegistrationValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deletePreRegistrationValidation = {
  params,
};
