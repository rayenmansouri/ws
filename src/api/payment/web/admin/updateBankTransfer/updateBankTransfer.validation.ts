import { validateNewId } from "../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  fullName: z.string().min(2).max(40).optional(),
  bankName: z.string().min(1).max(50).optional(),
  transactionReference: z.string().min(2).max(40).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  bankTransferNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateBankTransferValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateBankTransferValidation = {
  body,
  params,
};
