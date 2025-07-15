import { z } from "zod";
import { validateID } from "../../../../../core/validator";
import { addServiceValidation } from "../addService/addService.validation";

const body = addServiceValidation.body;
type TBody = z.infer<typeof body>;

const params = z.object({
  serviceId: validateID(),
});
type TParams = z.infer<typeof params>;

export type UpdateServiceValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateServiceValidation = {
  body,
  params,
};
