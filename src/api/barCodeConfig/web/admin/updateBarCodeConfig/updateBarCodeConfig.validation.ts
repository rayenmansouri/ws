import { z } from "zod";
import { addBarCodeConfigValidation } from "../addBarCodeConfig/addBarCodeConfig.validation";
import { validateNewId } from "../../../../../core/validator";

const body = addBarCodeConfigValidation.body.partial();
type TBody = z.infer<typeof body>;

const params = z.object({
  barCodeNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type UpdateBarCodeConfigValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updateBarCodeConfigValidation = {
  body,
  params,
};
