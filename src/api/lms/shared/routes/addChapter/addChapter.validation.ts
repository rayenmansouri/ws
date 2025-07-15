import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string(),
  description: z.string().optional(),
  classTypeNewId: validateNewId().optional(),
  topicNewId: validateNewId(),
  topicType: z.enum(["subjectType", "subSubjectType", "groupType"]),
  chapterAttachmentFileNewIds: z.array(validateNewId()),
});
type TBody = z.infer<typeof body>;

export type AddChapterValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addChapterValidation = {
  body,
};
