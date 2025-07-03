import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { CustomValidation } from "../../../../../core/validation/custom.validation";

const params = z.object({
  groupNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

const query = CustomValidation.validateExportOption();
type TQuery = z.infer<typeof query>;

export type GetStudentsOfGroupValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getStudentsOfGroupValidation = {
  params,
  query,
};
