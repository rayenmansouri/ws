import { z } from "zod";
import { validateNewId } from "./../../../../../core/validator";

const body = z.object({
  classNewId: validateNewId(),
  studentNewIds: z.array(validateNewId()),
});
type TBody = z.infer<typeof body>;

export type SwitchStudentsClassValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const switchStudentsClassValidation = {
  body,
};
