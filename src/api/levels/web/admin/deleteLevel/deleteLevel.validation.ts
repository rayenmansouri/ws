import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  levelNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteLevelValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteLevelValidation = {
  params,
};
