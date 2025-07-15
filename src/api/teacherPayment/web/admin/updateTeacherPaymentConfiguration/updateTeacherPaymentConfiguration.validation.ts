import { validateNewId } from "./../../../../../core/validator";
import { addTeacherPaymentConfigurationValidation } from "./../addTeacherPaymentConfiguration/addTeacherPaymentConfiguration.validation";
import { z } from "zod";

const body = addTeacherPaymentConfigurationValidation.body.partial().merge(
  z.object({
    deletedAttachment: z.array(z.string()).optional(),
  }),
);
type TBody = z.infer<typeof body>;

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateTeacherPaymentConfigurationValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateTeacherPaymentConfigurationValidation = {
  body,
  params,
};
