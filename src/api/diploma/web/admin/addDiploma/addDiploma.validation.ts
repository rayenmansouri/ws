import { z } from "zod";
import { TEMPLATE_ENUM } from "../../../../../feature/diploma/diploma.entity";

export const commonDiplomaEntityValidation = z.object({
  template: z.nativeEnum(TEMPLATE_ENUM),
  maxAverage: z.number().positive(),
  minAverage: z.number().nonnegative(),
  name: z.string().min(1),
});

const body = commonDiplomaEntityValidation.refine(
  data => data.minAverage <= data.maxAverage,
  "minAverage should be less than or equal to maxAverage",
);

type TBody = z.infer<typeof body>;

export type AddDiplomaValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addDiplomaValidation = {
  body,
};
