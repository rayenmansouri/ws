import { z } from "zod";
import { validateID } from "../../../../../core/validator";
import { PRE_REGISTRATION_STATUES_ENUM } from "../../../../../feature/preRegistration/domains/preRegistration.entity";
import {
  enrollmentDetailsValidation,
  filesValidation,
  otherInformation,
  parentInformationValidation,
  studentInformationValidation,
} from "../../public/updatePreRegistration/updatePreRegistration.validation";

const body = z
  .object({
    status: z.nativeEnum(PRE_REGISTRATION_STATUES_ENUM).optional(),
  })
  .merge(parentInformationValidation)
  .merge(studentInformationValidation)
  .merge(enrollmentDetailsValidation)
  .merge(otherInformation)
  .merge(filesValidation);

type TBody = z.infer<typeof body>;

const params = z.object({
  preRegistrationId: validateID(),
});
type TParams = z.infer<typeof params>;

export type UpdatePreRegistrationValidation = {
  body: TBody;
  params: TParams;
  query: never;
};

export const updatePreRegistrationValidation = {
  body,
  params,
};
