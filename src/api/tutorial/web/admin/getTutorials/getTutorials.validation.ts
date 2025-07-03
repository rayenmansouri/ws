import { z } from "zod";

const query = z.object({
  interfaceKey: z.string(),
});
type TQuery = z.infer<typeof query>;
export type GetTutorialValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getTutorialValidation = {
  query,
};
