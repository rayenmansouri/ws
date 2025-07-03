import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = paginationOptionsValidation;
type TQuery = z.infer<typeof query>;

export type ListIssueReasonsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listIssueReasonsValidation = {
  query,
};
