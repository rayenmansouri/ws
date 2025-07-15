import { z } from "zod";
import { validateID, validateNewId, validatePhoneNumber } from "../../../../../core/validator";

const body = z
  .object({
    services: z
      .array(z.object({ id: validateID(), discount: z.number().min(0).max(100) }))
      .min(1)
      .refine(value => {
        const ids = value.map(el => el.id);
        return new Set(ids).size === ids.length;
      }, "some services are duplicated"),
    emailReminder: z.boolean().optional(),
    email: z.string().email().optional(),
    smsReminder: z.boolean().optional(),
    phoneNumber: validatePhoneNumber().optional(),
    discount: z.number().min(0).max(100),
  })
  .refine(el => {
    if (el.emailReminder === true && !el.email) return false;
    if (el.smsReminder === true && !el.phoneNumber) return false;
    return true;
  }, "email or phone number is required");
type TBody = z.infer<typeof body>;

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateStudentPaymentConfigurationValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateStudentPaymentConfigurationValidation = {
  body,
  params,
};
