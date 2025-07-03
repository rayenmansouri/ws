import { z } from "zod";

const body = z.object({
  title: z.string(),
  link: z.string().url(),
  interfaceKeys: z.array(z.string()),
});
type TBody = z.infer<typeof body>;

export type AddTutorialValidation = {
  body: TBody;
  params: never;
  query: never;
};

export const addTutorialValidation = {
  body,
};
