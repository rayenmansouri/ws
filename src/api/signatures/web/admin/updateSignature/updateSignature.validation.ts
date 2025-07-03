import { z } from "zod";
import { addSignatureValidation } from "../addSignature/addSignature.validation";
import { validateNewId } from "../../../../../core/validator";

const body = addSignatureValidation.body.partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  signatureNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSignatureValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSignatureValidation = {
  body,
  params,
};
