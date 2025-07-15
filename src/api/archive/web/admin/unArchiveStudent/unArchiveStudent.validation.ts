import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UnArchiveStudentValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const unArchiveStudentValidation = {
  params,
};
