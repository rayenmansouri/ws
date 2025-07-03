import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  tutorialNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteTutorialValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteTutorialValidation = {
  params,
};
