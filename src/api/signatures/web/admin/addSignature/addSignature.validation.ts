import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const body = z.object({
  name: z.string(),
  personName: z.string().optional(),
  classTypes: z.array(validateID()),
});
type TBody = z.infer<typeof body>;

export type AddSignatureValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addSignatureValidation = {
  body,
};
