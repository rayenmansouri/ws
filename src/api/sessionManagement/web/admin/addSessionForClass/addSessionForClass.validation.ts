import { z } from "zod";
import { validateDate, validateNewId } from "../../../../../core/validator";
import { TOPIC_TYPE_ENUM } from "../../../../../helpers/constants";

const body = z.object({
  topicType: z.enum([TOPIC_TYPE_ENUM.SUBJECT_TYPE, TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE]),
  topicNewId: validateNewId(),
  sessionTypeNewId: validateNewId(),
  startTime: validateDate(),
  endTime: validateDate(),
  groupNewId: validateNewId().optional(),
  classNewId: validateNewId(),
  classroomNewId: validateNewId(),
});
type TBody = z.infer<typeof body>;

export type AddSessionForClassValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addSessionForClassValidation = {
  body,
};
