import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z
  .object({
    month: z.coerce.number().min(0).max(11).default(new Date().getMonth()),
    year: z.coerce.number().min(2000).max(3000).default(new Date().getFullYear()),
  })
  .passthrough();
type TQuery = z.infer<typeof query>;

export type GetTeacherPaymentDashboardValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getTeacherPaymentDashboardValidation = {
  params,
  query,
};
