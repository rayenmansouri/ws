import { z } from "zod";

const body = z.object({
  userAgent: z.string().min(1).optional(),
});
type TBody = z.infer<typeof body>;

export type LogoutValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const logoutValidation = {
  body,
};
