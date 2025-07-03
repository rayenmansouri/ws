import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classTypeNewId: validateNewId(),
  activityIndex: z.string(),
});
type TParams = z.infer<typeof params>;

export type DeleteClassTypeActivityValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteClassTypeActivityValidation = {
  params,
};
