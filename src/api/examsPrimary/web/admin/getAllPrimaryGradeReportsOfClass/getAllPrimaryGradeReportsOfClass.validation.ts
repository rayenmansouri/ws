import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  termNewId: validateNewId(),
  templateIds: z.array(validateID()).optional(),
});
type TQuery = z.infer<typeof query>;

export type GetAllPrimaryGradeReportsOfClassValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getAllPrimaryGradeReportsOfClassValidation = {
  params,
  query,
};
