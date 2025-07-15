import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  chapterAttachmentNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteChapterAttachmentValidation = {
  body: never;
  query: never;
  params: TParams;
};

export const deleteChapterAttachmentValidation = {
  params,
};
