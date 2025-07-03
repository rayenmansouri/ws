import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  studentNewIds: z.array(validateNewId()).min(1),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  groupNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UnassignStudentFromGroupValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const unassignStudentFromGroupValidation = {
  body,
  params,
};
