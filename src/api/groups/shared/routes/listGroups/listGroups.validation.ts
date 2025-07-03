import { z } from "zod";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = z.object({}).merge(paginationOptionsValidation);

type TQuery = z.infer<typeof query>;
export type ListGroupsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listGroupsValidation = {
  query,
};
