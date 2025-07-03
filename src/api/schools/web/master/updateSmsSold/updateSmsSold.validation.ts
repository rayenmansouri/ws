import { z } from "zod";
import { validateID } from "./../../../../../core/validator";

const body = z.object({
  smsSold: z.number().positive().min(1),
  operation: z.enum(["plus", "minus"]),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  schoolId: validateID(),
});
type TParams = z.infer<typeof params>;

export type UpdateSmsSoldValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSmsSoldValidation = {
  body,
  params,
};
