import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  sectionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteSectionValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteSectionValidation = {
  params,
};
