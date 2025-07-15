import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string(),
    preferredStartingHours: z.array(z.number()),
    illustration: z.string().optional(),
  })
  .partial();

type TBody = z.infer<typeof body>;

const params = z.object({
  subSubjectTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSubSubjectTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSubSubjectTypeValidation = {
  body,
  params,
};
