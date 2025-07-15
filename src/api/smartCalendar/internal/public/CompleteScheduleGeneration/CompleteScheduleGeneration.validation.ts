import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const body = z.object({
  activities: z.array(
    z.object({
      class: validateID(),
      sessionType: z.string(),
      subjectType: validateID().nullable(),
      subSubjectType: validateID().nullable(),
      teacher: validateID(),
      week: z.enum(["A", "B"]).nullable(),
      classGroup: z.enum(["1", "2"]).nullable(),
      startTime: z.object({
        day: z.number(),
        timeStamps: z.number(),
      }),
      endTime: z.object({
        day: z.number(),
        timeStamps: z.number(),
      }),
      classroom: validateID(),
    }),
  ),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  scheduleId: validateID(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  schoolSubdomain: z.string(),
});
type TQuery = z.infer<typeof query>;

export type CompleteScheduleGenerationValidation = {
  body: TBody;
  params: TParams;
  query: TQuery;
};

export const CompleteScheduleGenerationValidation = {
  body,
  params,
  query,
};
