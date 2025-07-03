import { z } from "zod";
import { validateID } from "../../../../../core/validator";

const params = z.object({
  preRegistrationId: validateID(),
});
type TParams = z.infer<typeof params>;

const query = z.object({
  schoolSubdomain: z.string(),
});
type TQuery = z.infer<typeof query>;

export type GetOnePreRegistrationValidation = {
  body: never;
  params: TParams;
  query: TQuery;
};

export const getOnePreRegistrationValidation = {
  params,
  query,
};
