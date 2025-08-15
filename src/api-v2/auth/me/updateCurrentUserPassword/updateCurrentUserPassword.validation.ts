import { z } from "zod";

const body = z
  .object({
    newPassword: z.string().min(8),
    currentPassword: z.string().min(8),
  })
  .refine(data => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type TBody = z.infer<typeof body>;

export type UpdateCurrentUserPasswordValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const updateCurrentUserPasswordValidation = {
  body,
};
