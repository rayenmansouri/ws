import { z } from "zod";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    userTypes: z.array(z.nativeEnum(END_USER_ENUM)).optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListRolesValidation = {
  query: TQuery;
  body: never;
  params: never;
};

export const listRolesValidation = {
  query,
};
