import { paginationOptionsValidation, validateNewId } from "./../../../../../core/validator";
import { z } from "zod";
import { validateID } from "./../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    gender: z.enum(["male", "female"]).optional(),
    level: validateID().optional(),
    classTypeNewIds: z.array(validateNewId()).optional(),
    isArchived: z.boolean().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListStudentsValidation = {
  query: TQuery;
  params: never;
  body: never;
};

export const listStudentsValidation = {
  query,
};
