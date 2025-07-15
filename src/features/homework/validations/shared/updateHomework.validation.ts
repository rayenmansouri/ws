import { z } from "zod";
import { validateDate, validateMongodId, validateNewId } from "../../../../core/validator";

const body = z.object({
  description: z.string().optional().nullable(),
  deletedHomeworks: z.array(z.string()).optional().default([]),
  sessionToDo: validateMongodId("session to do").optional(),
  name: z.string().min(1).optional(),
  dueDate: validateDate().optional(),
});
const params = z.object({ homeworkNewId: validateNewId() });

type TBody = z.infer<typeof body>;
type TParams = z.infer<typeof params>;
export type TUpdateHomeworkValidation = {
  body: TBody;
  params: TParams;
};

export const updateHomeworkValidation = {
  body,
  params,
};
