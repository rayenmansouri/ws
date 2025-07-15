import { z } from "zod";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    userType: z.enum([END_USER_ENUM.ADMIN, END_USER_ENUM.TEACHER]),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListRolesValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listRolesValidation = {
  query,
};
