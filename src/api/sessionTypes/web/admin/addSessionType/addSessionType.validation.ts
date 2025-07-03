import { z } from "zod";

const body = z.object({
  name: z.string(),
});
type TBody = z.infer<typeof body>;

export type AddSessionTypeValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addSessionTypeValidation = {
  body,
};
