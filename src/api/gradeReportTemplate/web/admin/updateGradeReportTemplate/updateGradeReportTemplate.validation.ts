import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string().optional(),
  subjectTypes: z.array(validateID()).optional(),
  classTypes: z.array(validateID()).optional(),
  isDefault: z.boolean().optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  templateNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateGradeReportTemplateValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateGradeReportTemplateValidation = {
  body,
  params,
};
