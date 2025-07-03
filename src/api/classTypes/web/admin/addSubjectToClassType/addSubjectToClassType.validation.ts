import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  subjectTypeNewId: validateNewId(),
  coefficient: z.number().positive(),
  exams: z
    .array(
      z.object({
        examTypeNewId: validateNewId(),
        coefficient: z.number().positive(),
      }),
    )
    .min(0)
    .optional(),
});

type TBody = z.infer<typeof body>;

const params = z.object({
  classTypeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type AddSubjectToClassTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const addSubjectToClassTypeValidation = {
  body,
  params,
};
