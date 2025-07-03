import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  subSubjectTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteSubSubjectTypeValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteSubSubjectTypeValidation = {
  params,
};
