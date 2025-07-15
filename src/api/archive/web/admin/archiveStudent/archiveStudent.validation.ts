import { validateNewId } from "./../../../../../core/validator";

import { z } from "zod";

const params = z.object({
  studentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type ArchiveStudentValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const archiveStudentValidation = {
  params,
};
