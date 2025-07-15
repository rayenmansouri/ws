import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    coefficient: z.number(),
    exams: z.array(
      z.object({
        examTypeNewId: validateNewId(),
        coefficient: z.number(),
      }),
    ),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  classTypeNewId: validateNewId(),
  subSubjectNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSubSubjectOfClassTypeValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSubSubjectOfClassTypeValidation = {
  body,
  params,
};
