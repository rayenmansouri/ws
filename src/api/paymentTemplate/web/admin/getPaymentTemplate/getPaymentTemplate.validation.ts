import { validateID } from "./../../../../../core/validator";
import { z } from "zod";

const params = z.object({
  paymentTemplateId: validateID(),
});
type TParams = z.infer<typeof params>;

export type GetPaymentTemplateValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getPaymentTemplateValidation = {
  params,
};
