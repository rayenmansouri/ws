import { z } from "zod";
import { validateID } from "./../../../../../core/validator";
import { addPaymentTemplateValidation } from "./../addPaymentTemplate/addPaymentTemplate.validation";

const body = addPaymentTemplateValidation.body.partial().strict();
type TBody = z.infer<typeof body>;

const params = z.object({
  paymentTemplateId: validateID(),
});

type TParams = z.infer<typeof params>;

export type UpdatePaymentTemplateValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updatePaymentTemplateValidation = {
  body,
  params,
};
