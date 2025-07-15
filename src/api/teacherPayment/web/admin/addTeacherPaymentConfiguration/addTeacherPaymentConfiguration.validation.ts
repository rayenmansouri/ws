import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";
import { PAYMENT_TYPE_ENUM } from "../../../../../feature/teacherPayment/domain/teacherPaymentConfiguration.entity";

const body = z.object({
  paymentType: z.nativeEnum(PAYMENT_TYPE_ENUM),
  contractType: z.string(),
  amount: z.coerce.number().positive(),
  bankAccountId: z
    .string()
    .length(20)
    .nullish()
    .refine(value => !value || !isNaN(+value) || +value > 0, "Invalid RIB"),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  teacherNewId: validateNewId(),
});

type TParams = z.infer<typeof params>;

export type AddTeacherPaymentConfigurationValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const addTeacherPaymentConfigurationValidation = {
  body,
  params,
};
