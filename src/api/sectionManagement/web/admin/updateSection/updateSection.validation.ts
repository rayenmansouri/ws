import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string(),
    subLevelNewIds: z.array(validateNewId()),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  sectionNewId: validateNewId(),
});

type TParams = z.infer<typeof params>;

export type UpdateSectionValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSectionValidation = {
  body,
  params,
};
