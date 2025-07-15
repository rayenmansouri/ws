import { validateNewId } from "./../../../../../core/validator";
import { z } from "zod";

const body = z.object({
  text: z.string().min(1).optional(),
});
type TBody = z.infer<typeof body>;

const params = z.object({
  issueNewId: validateNewId(),
});

type TParams = z.infer<typeof params>;

export type SendReplyValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const sendReplyValidation = {
  body,
  params,
};
