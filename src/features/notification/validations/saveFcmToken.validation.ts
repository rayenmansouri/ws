import { z } from "zod";

const body = z.object({
  registrationToken: z.string().min(1),
});
type TBody = z.infer<typeof body>;

export type TSaveFcmTokenValidation = {
  body: TBody;
};

export const saveFcmTokenValidation = {
  body,
};
