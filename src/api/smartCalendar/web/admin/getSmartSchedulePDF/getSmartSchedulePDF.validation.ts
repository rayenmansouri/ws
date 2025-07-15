import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  scheduleNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetSmartSchedulePDFValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const GetSmartSchedulePDFValidation = {
  params,
};
