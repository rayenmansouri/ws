import { validateID } from "./../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  name: z.string().min(3),
  services: z.array(z.object({ id: validateID(), discount: z.number().min(0).max(100) })).min(1),
  discount: z.number().min(0).max(100),
});
type TBody = z.infer<typeof body>;

export type AddPaymentTemplateValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addPaymentTemplateValidation = {
  body,
};
