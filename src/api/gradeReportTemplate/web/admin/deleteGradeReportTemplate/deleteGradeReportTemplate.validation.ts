import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  templateNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteGradeReportTemplateValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteGradeReportTemplateValidation = {
  params,
};
