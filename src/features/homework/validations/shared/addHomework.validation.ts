import { z } from "zod";
import { validateDate, validateNewId, validId } from "../../../../core/validator";

export const body = z
  .object({
    name: z.string(),
    sessionGiven: validId("sessionGiven"),
    sessionToDo: validId("sessionToDo"),
    classNewId: validateNewId(),
    classGroup: validId("classGroup"),
    dueDate: validateDate().optional(),
    description: z
      .string()
      .nullable()
      .transform(value => {
        if (value === "null") return null;
        return value;
      }),
  })
  .partial()
  .required({ name: true })
  .and(
    z
      .object({ subjectType: validateNewId() })
      .or(z.object({ subSubjectType: validateNewId() }))
      .or(z.object({ groupNewId: validateNewId() })),
  )
  .and(
    z.union([z.object({ classNewId: validateNewId() }), z.object({ groupNewId: validateNewId() })]),
  );

export type TAddHomeworkPayload = z.infer<typeof body>;

export type TAddHomeworkValidation = {
  body: TAddHomeworkPayload;
};

export const addHomeworkValidation = {
  body,
};
