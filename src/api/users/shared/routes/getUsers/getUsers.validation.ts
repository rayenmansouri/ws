import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  search: z.string().optional(),
  postNewId: validateNewId(),
});
type TQuery = z.infer<typeof query>;

export type GetUsersValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getUsersValidation = {
  query,
};
