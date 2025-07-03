import { z } from "zod";

const query = z.object({
  search: z.string().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetGroupsOfTeacherValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getGroupsOfTeacherValidation = {
  query,
};
