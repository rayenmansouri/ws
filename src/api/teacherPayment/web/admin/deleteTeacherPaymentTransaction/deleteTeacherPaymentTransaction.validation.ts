import { validateID } from "./../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  transactionId: validateID(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  teacherPaymentId: validateID(),
});
type TParams = z.infer<typeof params>;

export type DeleteTeacherPaymentTransactionValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const deleteTeacherPaymentTransactionValidation = {
  body,
  params,
};
