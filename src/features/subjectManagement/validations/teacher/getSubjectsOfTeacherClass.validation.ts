import { z } from "zod";
import { validateNewId } from "../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
});

type TParams = z.infer<typeof params>;

const query = z.object({
  isGroup: z.boolean(),
});

type TQuery = z.infer<typeof query>;

export type TGetSubjectsOfTeacherClassValidation = {
  params: TParams;
  query: TQuery;
};

export const getSubjectOfTeacherClassValidation = {
  params,
  query,
};
