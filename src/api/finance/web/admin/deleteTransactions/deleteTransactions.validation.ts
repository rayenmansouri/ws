import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const body = z.object({
  ids: z.array(validateID()),
});
type TBody = z.infer<typeof body>;

export type DeleteTransactionsValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const deleteTransactionsValidation = {
  body,
};
