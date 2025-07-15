import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string().min(1),
    coefficient: z.number().min(1),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  termNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateTermValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateTermValidation = {
  body,
  params,
};
