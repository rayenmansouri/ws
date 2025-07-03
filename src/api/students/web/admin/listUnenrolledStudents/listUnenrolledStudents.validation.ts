import { z } from "zod";
import {
  paginationOptionsValidation,
  validateID,
  validateNewId,
} from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    classNewId: validateNewId().optional(),
    classTypeNewId: validateNewId().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListUnenrolledStudentsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listUnenrolledStudentsValidation = {
  query,
};
