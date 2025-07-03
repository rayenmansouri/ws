import { z } from "zod";
import {
  paginationOptionsValidation,
  validateID,
  validateNewId,
} from "../../../../../core/validator";

const query = z
  .object({
    classNewId: validateNewId().optional(),
    groupNewId: validateNewId().optional(),
    observationReasonId: validateID().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListObservationsByTeacherValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listObservationsByTeacherValidation = {
  query,
};
