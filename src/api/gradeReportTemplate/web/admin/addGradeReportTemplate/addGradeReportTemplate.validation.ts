import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const body = z.object({
  name: z.string(),
  subjectTypes: z.array(validateID()),
  classTypes: z.array(validateID()),
  isDefault: z.boolean(),
});
type TBody = z.infer<typeof body>;

export type AddGradeReportTemplateValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addGradeReportTemplateValidation = {
  body,
};
