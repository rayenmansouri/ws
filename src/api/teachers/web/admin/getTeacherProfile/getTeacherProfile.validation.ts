import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { validateID } from "./../../../../../core/validator";

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  schoolYearId: validateID().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetTeacherProfileValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getTeacherProfileValidation = {
  params,
  query,
};
