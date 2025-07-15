import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  commentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetReactionsOfCommentValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getReactionsOfCommentValidation = {
  params,
};
