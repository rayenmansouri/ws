import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  teacherNewId: validateNewId().optional(),
});
type TQuery = z.infer<typeof query>;
const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetTeacherClassAndGroupsValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getTeacherClassAndGroupsValidation = {
  query,
  params,
};
