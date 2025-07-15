import { z } from "zod";
import { emailValidation, validatePhoneNumber } from "../../../../../core/validator";

const validateCentralNewId = z.string().refine(value => {
  const [tenantId, userNewId] = value.split(".");
  return (
    tenantId && userNewId && tenantId.length > 0 && userNewId.length > 0 && !value.split(".")[2]
  );
}, "Invalid newId format. It should be in the format tenantId.userNewId");

const body = z.object({
  credential: z.union([emailValidation(), validatePhoneNumber(), validateCentralNewId]),
  password: z.string().min(8),
});
type TBody = z.infer<typeof body>;

export type LoginByStudentValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const loginByStudentValidation = {
  body,
};
