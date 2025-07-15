import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const body = z.object({
  classTypeNewId: validateNewId(),
  name: z.string().min(1),
  students: z.array(validateID()).optional(),
  subjectTeachers: z.record(validateID(), validateID()),
  subSubjectTeachers: z.record(validateID(), validateID()),
});

type TBody = z.infer<typeof body>;

export type AddClassValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addClassValidation = {
  body,
};
