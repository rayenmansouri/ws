import { z } from "zod";

const body = z.object({
  name: z.string().min(1),
  coefficient: z.number().nullable(),
  exams: z.array(z.object({ examTypeNewId: z.string().min(1), coefficient: z.number() })),
  illustration: z.string(),
});
type TBody = z.infer<typeof body>;

export type AddGroupTypeValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addGroupTypeValidation = {
  body,
};
