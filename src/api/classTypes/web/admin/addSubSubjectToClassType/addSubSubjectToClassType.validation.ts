import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  subSubjectTypeNewId: validateNewId(),
  coefficient: z.number().positive(),
  exams: z
    .array(
      z.object({
        examTypeNewId: validateNewId(),
        coefficient: z.number().positive(),
      }),
    )
    .min(1),
});

type TBody = z.infer<typeof body>;

const params = z.object({
  classTypeNewId: validateNewId(),
  subjectTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AddSubSubjectToClassTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const addSubSubjectToClassTypeValidation = {
  body,
  params,
};
