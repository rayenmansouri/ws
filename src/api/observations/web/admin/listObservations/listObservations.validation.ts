import { z } from "zod";
import { validateNewId, validateID } from "../../../../../core/validator";
import { paginationOptionsValidation } from "../../../../../core/validator";

const query = z
  .object({
    classNewId: validateNewId().optional(),
    groupNewId: validateNewId().optional(),
    studentNewId: validateNewId().optional(),
    teacherNewId: validateNewId().optional(),
    observationReasonId: validateID().optional(),
  })
  .merge(paginationOptionsValidation);

type TQuery = z.infer<typeof query>;

export type ListObservationsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listObservationsValidation = {
  query,
};
