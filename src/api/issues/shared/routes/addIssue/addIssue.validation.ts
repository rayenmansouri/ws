import { z } from "zod";
import { END_USER_ENUM } from "./../../../../../constants/globalEnums";
import { validateID, validateNewId } from "./../../../../../core/validator";

const issueToTeacher = z.object({
  targetType: z.literal(END_USER_ENUM.TEACHER),
  teacherId: validateID(),
});
const issueToAdmin = z.object({
  targetType: z.literal(END_USER_ENUM.ADMIN),
  teacherId: z.undefined(),
});
const body = z
  .object({
    studentNewId: validateNewId(),
    content: z.string(),
    issueReasonId: validateID(),
  })
  .and(issueToTeacher.or(issueToAdmin));

type TBody = z.infer<typeof body>;

export type AddIssueValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addIssueValidation = {
  body,
};
