import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetAllCambridgeAnnualGradeReportsValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getAllCambridgeAnnualGradeReportsValidation = {
  params,
};
