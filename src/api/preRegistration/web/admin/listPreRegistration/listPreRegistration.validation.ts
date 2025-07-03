import { z } from "zod";
import { paginationOptionsValidation, validateID } from "../../../../../core/validator";
import { PRE_REGISTRATION_STATUES_ENUM } from "../../../../../feature/preRegistration/domains/preRegistration.entity";

const query = z
  .object({
    search: z.string().optional(),
    level: validateID().optional(),
    status: z.nativeEnum(PRE_REGISTRATION_STATUES_ENUM).optional(),
    isRegistered: z.boolean().optional(),
  })
  .merge(paginationOptionsValidation);
type TQuery = z.infer<typeof query>;

export type ListPreRegistrationValidation = {
  body: never;
  params: never;
  query: TQuery;
};

export const listPreRegistrationValidation = {
  query,
};
