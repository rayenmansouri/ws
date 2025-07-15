import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  studentNewIds: z.array(validateNewId()).nonempty(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  groupNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AssignStudentToGroupValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const assignStudentToGroupValidation = {
  body,
  params,
};
