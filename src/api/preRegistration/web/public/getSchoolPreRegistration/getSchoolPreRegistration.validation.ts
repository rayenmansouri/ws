import { z } from "zod";
import { subDomainValidation } from "../../../../../core/validator";

const query = z.object({
  subdomain: subDomainValidation(),
});

export type TQuery = z.infer<typeof query>;

export type GetSchoolPreRegistrationValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const getSchoolPreRegistrationValidation = {
  query,
};
