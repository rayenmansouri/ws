import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { commonDiplomaEntityValidation } from "../addDiploma/addDiploma.validation";

const body = commonDiplomaEntityValidation.partial().refine(data => {
  return (
    data.minAverage != undefined &&
    data.maxAverage != undefined &&
    !!(data.minAverage <= data.maxAverage)
  );
}, "minAverage should be less than or equal to maxAverage");
type TBody = z.infer<typeof body>;

const params = z.object({
  diplomaNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateDiplomaValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateDiplomaValidation = {
  body,
  params,
};
