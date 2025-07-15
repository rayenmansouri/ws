import { z } from "zod";
import { validateNewId } from "../../../../core/validator";

const params = z.object({
  teacherNewId: validateNewId(),
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  isGroup: z.boolean(),
});
type TQuery = z.infer<typeof query>;

export const getSubjectsOfClassByAdminValidation = {
  params,
  query,
};

export type TGetSubjectsOfClassByAdminValidation = {
  params: TParams;
  query: TQuery;
};
