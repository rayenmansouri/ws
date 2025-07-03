import { z } from "zod";
import moment from "moment";
import { validateNewId } from "./../../../../../core/validator";

const body = z
  .object({
    month: z.number().min(0).max(11),
    year: z.number().min(2000).max(3000),
  })
  .refine(values => {
    return moment().diff({ year: values.year, month: values.month }, "month") > 0;
  }, "Teacher payment can done in previous month or in the past");
type TBody = z.infer<typeof body>;

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type PayTeacherValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const payTeacherValidation = {
  body,
  params,
};
