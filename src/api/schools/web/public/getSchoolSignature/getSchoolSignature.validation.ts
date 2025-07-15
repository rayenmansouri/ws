import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const params = z.object({
  schoolId: validateID(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  classTypeId: validateID().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetSchoolSignatureValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getSchoolSignatureValidation = {
  params,
  query,
};
