import { z } from "zod";
import { validateDate, validateNewId } from "../../../../../core/validator";

const body = z.object({
  sessionTypeNewId: validateNewId(),
  startTime: validateDate(),
  endTime: validateDate(),
  groupNewId: validateNewId(),
  classroomNewId: validateNewId(),
});
type TBody = z.infer<typeof body>;

export type AddSessionForGroupValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addSessionForGroupValidation = {
  body,
};
