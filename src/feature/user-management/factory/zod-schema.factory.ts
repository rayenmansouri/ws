import { z } from "zod";
import { OrganizationSystemType } from "../../organization-magement/enums";
import { baseParticipantSchema } from "../participant/validations/base-participant.schema";
import { dncSchema } from "../participant/validations/dnc.schema";

export function getParticipantValidationSchema(organizationSystemType: OrganizationSystemType): z.ZodSchema {
  switch (organizationSystemType) {
    case OrganizationSystemType.DNC:
      return dncSchema;
    case OrganizationSystemType.CAR:
      // TODO: Add CAR participant schema when available
      return baseParticipantSchema;
    case OrganizationSystemType.SESAME:
      // TODO: Add SESAME participant schema when available
      return baseParticipantSchema;
    case OrganizationSystemType.CERES:
      // TODO: Add CERES participant schema when available
      return baseParticipantSchema;
    case OrganizationSystemType.LIBAN:
      // TODO: Add LIBAN participant schema when available
      return baseParticipantSchema;
    default:
      throw new Error(`Organization system type ${organizationSystemType} not supported for participant validation`);
  }
}
