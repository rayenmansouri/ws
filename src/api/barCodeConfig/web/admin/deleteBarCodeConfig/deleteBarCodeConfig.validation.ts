import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  barCodeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteBarCodeConfigValidation = {
  params: TParams;
  body: never;
  query: never;
};

export const deleteBarCodeConfigValidation = {
  params,
};
