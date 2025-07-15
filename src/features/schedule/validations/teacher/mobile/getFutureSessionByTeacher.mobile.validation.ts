import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  type: z.enum(["subjectType", "subSubjectType", "group"]),
  id: z.string().length(24),
  classNewId: validateNewId().optional(),
});
type TBody = z.infer<typeof body>;

export type TGetFutureSessionByTeacherMobileValidation = {
  body: TBody;
};

export const getFutureSessionByTeacherMobileValidation = {
  body,
};
