import { z } from "zod";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";

const params = z.object({
  postNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = paginationOptionsValidation;
type TQuery = z.infer<typeof query>;

export type ListCommentsOfPostValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const listCommentsOfPostValidation = {
  params,
  query,
};
