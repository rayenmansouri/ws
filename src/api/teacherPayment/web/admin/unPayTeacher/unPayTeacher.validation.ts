import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const body = z.object({
  month: z.number().min(0).max(11),
  year: z.number().min(2000).max(3000),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;
export type UnPayTeacherValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const unPayTeacherValidation = {
  body,
  params,
};
