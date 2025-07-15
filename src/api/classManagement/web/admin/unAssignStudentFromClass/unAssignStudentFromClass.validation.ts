import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const body = z.object({
  studentIds: z.array(validateID()).min(1),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UnAssignStudentFromClassValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const unAssignStudentFromClassValidation = {
  body,
  params,
};
