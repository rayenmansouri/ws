import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetStudentDocumentsFilterValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getStudentDocumentsFilterValidation = {
  params,
};
