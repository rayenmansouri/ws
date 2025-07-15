import { z } from "zod";

const body = z.object({
  name: z.string().min(1),
  preferredStartingHours: z.array(z.number()).optional(),
  illustration: z.string(),
});
type TBody = z.infer<typeof body>;

export type AddSubSubjectTypeValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addSubSubjectTypeValidation = {
  body,
};
