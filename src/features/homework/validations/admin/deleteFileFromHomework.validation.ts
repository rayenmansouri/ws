import { z } from "zod";
import { validateNewId } from "../../../../core/validator";

const body = z.object({
  publicId: z.string(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  homeworkNewId: validateNewId(),
});

type TParams = z.infer<typeof params>;

export const deleteFileFromHomeworkValidation = { body, params };
export type TDeleteFileFromHomeworkValidation = { params: TParams; body: TBody };
