import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetStudentPaymentConfigurationValidation = {
  body: never;
  query: never;
  params: TParams;
};

export const getStudentPaymentConfigurationValidation = {
  params,
};
