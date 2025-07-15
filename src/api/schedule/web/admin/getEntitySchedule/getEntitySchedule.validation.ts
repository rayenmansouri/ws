import { z } from "zod";

const query = z.object({
  search: z.string(),
});
type TQuery = z.infer<typeof query>;

export type GetEntityScheduleValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getEntityScheduleValidation = {
  query,
};
