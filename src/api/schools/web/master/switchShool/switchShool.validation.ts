import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  schoolNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type SwitchShoolValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const switchShoolValidation = {
  params,
};
