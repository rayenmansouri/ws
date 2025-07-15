import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string().min(1),
  groupTypeNewId: validateNewId(),
  teacherNewId: validateNewId(),
  classTypeNewIds: z.array(validateNewId()).min(1),
});
type TBody = z.infer<typeof body>;

export type AddGroupValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addGroupValidation = {
  body,
};
