import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  signatureNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteSignatureValidation = {
  params: TParams;
  body: never;
  query: never;
};

export const deleteSignatureValidation = {
  params,
};
