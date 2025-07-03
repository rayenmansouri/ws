import { z } from "zod";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";

const query = z
  .object({
    userType: z.array(z.nativeEnum(END_USER_ENUM)),
    search: z.string(),
    classTypeNewIds: z.array(validateNewId()),
    levelNewIds: z.array(validateNewId()),
    classNewIds: z.array(validateNewId()),
    postNewId: validateNewId(),
  })
  .partial()
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListUsersValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listUsersValidation = {
  query,
};
