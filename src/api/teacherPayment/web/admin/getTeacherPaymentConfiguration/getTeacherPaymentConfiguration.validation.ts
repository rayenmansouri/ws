import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetTeacherPaymentConfigurationValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getTeacherPaymentConfigurationValidation = {
  params,
};
