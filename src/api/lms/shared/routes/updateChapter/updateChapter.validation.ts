import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    name: z.string(),
    description: z.string(),
    chapterAttachmentNewIds: z.array(validateNewId()).optional(),
  })
  .partial();

type TBody = z.infer<typeof body>;

const params = z.object({
  chapterNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateChapterValidation = {
  params: TParams;
  body: TBody;
  query: never;
};

export const updateChapterValidation = {
  params,
  body,
};
