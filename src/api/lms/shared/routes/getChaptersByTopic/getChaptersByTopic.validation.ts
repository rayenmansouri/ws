import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const query = z.object({
  topicType: z.enum(["subjectType", "subSubjectType", "groupType"]),
  topicNewId: validateNewId(),
  classTypeNewId: validateNewId().optional(),
});
type TQuery = z.infer<typeof query>;

export type GetChaptersByTopicValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getChaptersByTopicValidation = {
  query,
};
