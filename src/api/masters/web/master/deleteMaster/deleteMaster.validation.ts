import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  masterNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type DeleteMasterValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const deleteMasterValidation = {
  params,
};
