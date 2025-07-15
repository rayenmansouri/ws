import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const body = z
  .object({
    title: z.string(),
    link: z.string().url(),
    interfaceKeys: z.array(z.string()),
  })
  .partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  tutorialNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateTutorialValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateTutorialValidation = {
  body,
  params,
};
