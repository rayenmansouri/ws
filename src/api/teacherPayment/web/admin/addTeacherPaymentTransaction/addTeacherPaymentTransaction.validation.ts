import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";
import { TRANSACTION_ADJUSTMENT_TYPE_ENUM } from "../../../../../feature/teacherPayment/domain/teacherPaymentConfiguration.entity";

const body = z.object({
  month: z.number().min(0).max(11).default(new Date().getMonth()),
  year: z.number().min(2000).max(3000).default(new Date().getFullYear()),
  name: z.string().max(100),
  amount: z.number().positive(),
  type: z.nativeEnum(TRANSACTION_ADJUSTMENT_TYPE_ENUM),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AddTeacherPaymentTransactionValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const addTeacherPaymentTransactionValidation = {
  body,
  params,
};
