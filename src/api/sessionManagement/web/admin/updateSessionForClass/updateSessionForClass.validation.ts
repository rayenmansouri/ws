import { z } from "zod";
import { validateDate, validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    startTime: validateDate(),
    endTime: validateDate(),
    classroomNewId: validateNewId(),
    groupNewId: validateNewId(),
    sessionTypeNewId: validateNewId(),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  sessionNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateSessionForClassValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateSessionForClassValidation = {
  body,
  params,
};
