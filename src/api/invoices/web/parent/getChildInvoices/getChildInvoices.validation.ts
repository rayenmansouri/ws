import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  studentNewId: validateNewId().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetChildInvoicesValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getChildInvoicesValidation = {
  query,
};
