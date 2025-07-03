import { z } from "zod";
import { validateNewId } from "../../../../../core/validator";

const params = z.object({
  observationNewId: validateNewId(),
});
type TParams = z.infer<typeof params>;

export type GetOneObservationValidation = {
  body: never;
  params: TParams;
  query: never;
};

export const getOneObservationValidation = {
  params,
};
