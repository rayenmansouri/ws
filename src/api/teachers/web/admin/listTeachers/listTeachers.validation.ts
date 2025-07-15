import { GENDER_ENUM } from "../../../../../feature/users/domain/baseUser.entity";
import { paginationOptionsValidation, validateID } from "./../../../../../core/validator";
import { z } from "zod";

const query = z
  .object({
    search: z.string().optional(),
    gender: z.nativeEnum(GENDER_ENUM).optional(),
    level: validateID().optional(),
    subjectType: validateID().optional(),
    groupType: validateID().optional(),
    isArchived: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListTeachersValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listTeachersValidation = {
  query,
};
