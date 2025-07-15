import { z } from "zod";
import { validateDate, validateNewId, validatePhoneNumber } from "../../../../../core/validator";
import { BANK_CHECK_STATUS_ENUM } from "../../../../../feature/studentPayments/domain/bankCheck.entity";

const body = z.object({
  fullName: z.string().optional(),
  checkNumber: z.string().optional(),
  phoneNumber: validatePhoneNumber().nullable().optional(),
  withdrawDate: validateDate().nullable().optional(),
  bankName: z.string().optional(),
  status: z.nativeEnum(BANK_CHECK_STATUS_ENUM).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  bankCheckNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateBankCheckValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateBankCheckValidation = {
  body,
  params,
};
