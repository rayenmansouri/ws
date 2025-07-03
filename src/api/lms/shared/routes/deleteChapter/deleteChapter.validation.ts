import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  chapterNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteChapterValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteChapterValidation = {
  params,
};
