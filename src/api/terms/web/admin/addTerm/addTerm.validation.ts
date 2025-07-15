import { z } from "zod";

const body = z.object({
  name: z.string(),
  coefficient: z.number().min(1),
});
type TBody = z.infer<typeof body>;

export type AddTermValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addTermValidation = {
  body,
};
