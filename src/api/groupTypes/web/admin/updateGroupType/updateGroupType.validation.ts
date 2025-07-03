import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string().min(1),
    coefficient: z.number().nullable(),
    exams: z.array(z.object({ examTypeNewId: z.string().min(1), coefficient: z.number() })),
    illustration: z.string().optional(),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  groupTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateGroupTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateGroupTypeValidation = {
  body,
  params,
};
