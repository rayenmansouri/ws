import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const params = z.object({
  preRegistrationId: validateID(),
});
type TParams = z.infer<typeof params>;

export type RegisterStudentValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const registerStudentValidation = {
  params,
};
