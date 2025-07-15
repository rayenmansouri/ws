import { z } from "zod";
import { validateID, validateNewId } from "../../../../../core/validator";

const body = z.object({
  name: z.string().min(1).optional(),
  allowAllSubjects: z.boolean().optional(),
  allowAllSessionTypes: z.boolean().optional(),
  subjectTypes: z.array(validateID()).optional(),
  sessionTypes: z.array(validateID()).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  classroomNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateClassroomValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateClassroomValidation = {
  body,
  params,
};
