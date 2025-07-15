import { validateID } from "./../../../../../core/validator";
import { END_USER_ENUM } from "./../../../../../constants/globalEnums";
import { z } from "zod";
import { paginationOptionsValidation } from "./../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    userTypes: z.array(z.nativeEnum(END_USER_ENUM)).optional(),
    classes: z.array(validateID()).optional(),
    classTypes: z.array(validateID()).optional(),
    levels: z.array(validateID()).optional(),
    groups: z.array(validateID()).optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListUsersForAlertValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listUsersForAlertValidation = {
  query,
};
