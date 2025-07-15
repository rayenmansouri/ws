import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const body = z.object({
  students: z.array(validateID()).min(1),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AssignStudentToClassValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const AssignStudentToClassValidation = {
  body,
  params,
};
