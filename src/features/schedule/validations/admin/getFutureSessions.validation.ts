import { z } from "zod";
import { validateNewId } from "../../../../core/validator";

const query = z.object({
  type: z.enum(["subjectType", "subSubjectType", "group"]),
  newId: validateNewId(),
  classNewId: validateNewId().optional(),
});
type TQuery = z.infer<typeof query>;

export type TGetFutureSessionsValidation = {
  query: TQuery;
};

export const getFutureSessionsValidation = {
  query,
};
