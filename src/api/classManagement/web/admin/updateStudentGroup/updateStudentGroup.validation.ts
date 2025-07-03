import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  classGroupNewId: validateNewId(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classNewId: validateNewId(),
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateStudentGroupValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateStudentGroupValidation = {
  body,
  params,
};
