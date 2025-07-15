import { z } from "zod";
import { validateDate, validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string().optional(),
  terms: z.array(
    z.object({
      termNewId: validateNewId(),
      startDate: validateDate(),
      endDate: validateDate(),
    }),
  ),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  schoolYearNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSchoolYearValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSchoolYearValidation = {
  body,
  params,
};
