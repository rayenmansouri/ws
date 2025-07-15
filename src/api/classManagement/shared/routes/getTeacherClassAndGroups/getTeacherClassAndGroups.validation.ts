import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  teacherNewId: validateNewId().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetTeacherClassAndGroupsValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getTeacherClassAndGroupsValidation = {
  query,
};
