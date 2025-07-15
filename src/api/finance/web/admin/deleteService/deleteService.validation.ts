import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const body = z.object({
  ids: z.array(validateID()).min(1),
});
type TBody = z.infer<typeof body>;

export type DeleteServiceValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const deleteServiceValidation = {
  body,
};
