import { validateID } from "./../../../../../core/validator";
import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  subLevelNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  classTypeNewId: validateNewId().optional(),
  schoolYearId: validateID().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetClassListValidation = {
  params: TParams;
  query: TQuery;
  body: never;
};

export const getClassListValidation = {
  params,
  query,
};
