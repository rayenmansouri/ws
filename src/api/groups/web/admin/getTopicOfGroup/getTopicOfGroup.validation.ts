import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  groupNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetTopicOfGroupValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getTopicOfGroupValidation = {
  params,
};
