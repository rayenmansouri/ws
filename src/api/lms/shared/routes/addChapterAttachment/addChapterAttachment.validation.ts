import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string(),
  description: z.string(),
  teacherNewId: validateNewId(),
  classTypes: z.array(validateNewId()).optional(),
  subjectTypes: z.array(validateNewId()).optional(),
  subSubjectTypes: z.array(validateNewId()).optional(),
});
type TBody = z.infer<typeof body>;

export type AddChapterAttachmentValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addChapterAttachmentValidation = {
  body,
};
