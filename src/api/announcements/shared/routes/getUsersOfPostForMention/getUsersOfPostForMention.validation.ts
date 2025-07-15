import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  search: z.string().optional(),
  postNewId: validateNewId(),
});
type TQuery = z.infer<typeof query>;

export type GetUsersOfPostForMentionValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getUsersOfPostForMentionValidation = {
  query,
};
