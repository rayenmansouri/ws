import { validateID } from "./../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  paymentTemplateIds: z.array(validateID()).min(1),
});
type TBody = z.infer<typeof body>;

export type DeletePaymentTemplateValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const deletePaymentTemplateValidation = {
  body,
};
