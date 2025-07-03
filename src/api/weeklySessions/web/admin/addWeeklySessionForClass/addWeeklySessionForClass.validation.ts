import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";
import { TOPIC_TYPE_ENUM } from "../../../../../feature/examGrade/domain/tunisian/ExamGrade.entity";

const validateTime = z.object({
  day: z.number().min(0).max(6),
  hours: z.number().min(0).max(23),
  minutes: z.number().min(0).max(59),
});

const body = z.object({
  topicType: z.enum([TOPIC_TYPE_ENUM.SUBJECT_TYPE, TOPIC_TYPE_ENUM.SUB_SUBJECT_TYPE]),
  topicTypeNewId: validateNewId(),
  sessionTypeNewId: validateNewId(),
  startTime: validateTime,
  endTime: validateTime,
  classroomNewId: validateNewId(),
  groupNewId: validateNewId().optional(),
  week: z.enum(["A", "B"]).optional(),
  classNewId: validateNewId(),
});
type TBody = z.infer<typeof body>;

export type AddWeeklySessionForClassValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addWeeklySessionForClassValidation = {
  body,
};
