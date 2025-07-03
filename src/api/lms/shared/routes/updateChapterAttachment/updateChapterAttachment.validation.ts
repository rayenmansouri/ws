import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { CHAPTER_ATTACHMENT_STATUS_ENUM } from "../../../../../feature/lms/domain/chapterAttachment.entity";

const body = z
  .object({
    name: z.string(),
    description: z.string(),
    teacherNewId: validateNewId(),
    status: z.nativeEnum(CHAPTER_ATTACHMENT_STATUS_ENUM),
    classTypes: z.array(validateNewId()),
    subjectTypes: z.array(validateNewId()),
    subSubjectTypes: z.array(validateNewId()),
  })
  .partial();

type TBody = z.infer<typeof body>;

const params = z.object({
  chapterAttachmentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateChapterAttachmentValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateChapterAttachmentValidation = {
  body,
  params,
};
