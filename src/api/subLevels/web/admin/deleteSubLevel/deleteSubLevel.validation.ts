import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  subLevelNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteSubLevelValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteSubLevelValidation = {
  params,
};
