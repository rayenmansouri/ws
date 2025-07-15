import { validateID } from "./../../../../../core/validator";
import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  groupTypeNewId: validateNewId().optional(),
  schoolYearId: validateID().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetGroupListValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getGroupListValidation = {
  query,
};
