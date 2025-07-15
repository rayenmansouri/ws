import { z } from "zod";

const query = z.object({
  fullName: z.string().optional().default(""),
});
type TQuery = z.infer<typeof query>;

export type GetMessageTargetUsersValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getMessageTargetUsersValidation = {
  query,
};
