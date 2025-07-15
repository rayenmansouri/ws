import { z } from "zod";
import {
  paginationOptionsValidation,
  validateID,
  validateNewId,
} from "../../../../../core/validator";

const query = z
  .object({
    studentNewId: validateNewId(),
    observationReasonId: validateID().optional(),
  })
  .merge(paginationOptionsValidation);

type TQuery = z.infer<typeof query>;

export type ListObservationsByParentValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listObservationsByParentValidation = {
  query,
};
