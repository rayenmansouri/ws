import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  classroomNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteClassroomValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteClassroomValidation = {
  params,
};
