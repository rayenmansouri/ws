import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const params = z.object({
  teacherNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ArchiveTeacherValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const archiveTeacherValidation = {
  params,
};
