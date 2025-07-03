import { z } from "zod";
import { studentValidation } from "../../../shared/validation/student.validation";

const body = studentValidation;
type TBody = z.infer<typeof body>;

export type TAddStudentValidation = {
  params: never;
  query: never;
  body: TBody;
};

export const addStudentValidation = {
  body,
};
