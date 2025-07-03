import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const body = z.object({
  name: z.string().min(1),
  allowAllSubjects: z.boolean().optional(),
  allowAllSessionTypes: z.boolean().optional(),
  subjectTypes: z.array(validateID()).min(0).optional(),
  sessionTypes: z.array(validateID()).min(0).optional(),
});
type TBody = z.infer<typeof body>;

export type AddClassroomValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addClassroomValidation = {
  body,
};
