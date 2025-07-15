import { z } from "zod";

const body = z.object({
  name: z.string().min(1),
});
type TBody = z.infer<typeof body>;

export type AddExamTypeValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addExamTypeValidation = {
  body,
};
