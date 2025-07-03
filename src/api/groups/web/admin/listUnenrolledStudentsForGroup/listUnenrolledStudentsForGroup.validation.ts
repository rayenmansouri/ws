import { z } from "zod";
import { paginationOptionsValidation, validateNewId } from "../../../../../core/validator";

const query = z
  .object({
    search: z.string().optional(),
    groupNewId: validateNewId(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListUnenrolledStudentsForGroupValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listUnenrolledStudentsForGroupValidation = {
  query,
};
