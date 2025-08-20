import { z } from "zod";
import { GradeBookTheme } from "../../../feature/organization-magement/domain/organization.entity";
import { OrganizationSystemType } from "../../../feature/organization-magement/enums";

const body = z.object({
  name: z.string().min(1).max(255).optional(),
  address: z.string().min(1).max(500).optional(),
  phone: z.string().min(1).max(20).optional(),
  email: z.string().email().max(255).optional(),
  website: z.string().url().max(255).optional(),
  phoneNumber: z.string().min(1).max(20).optional(),
  directorName: z.string().min(1).max(255).optional(),
  configName: z.string().min(1).max(255).optional(),
  maxStudentSeats: z.number().int().min(1).max(10000).optional(),
  gradeBookTheme: z.nativeEnum(GradeBookTheme).optional(),
  enableEmail: z.boolean().optional(),
  organizationSystemType: z.nativeEnum(OrganizationSystemType).optional(),
  logo: z.string().url().nullable().optional(),
  forceCloseSessionDelayInMin: z.number().int().min(0).max(1440).optional(),
  openSessionDelayInMin: z.number().int().min(0).max(1440).optional(),
  openSessionAdvanceInMin: z.number().int().min(0).max(1440).optional(),
  notAvailableTimes: z.array(
    z.object({
      day: z.number().int().min(0).max(6),
      hours: z.array(z.number().int().min(0).max(23))
    })
  ).optional(),
  cover: z.string().url().optional(),
  timeZone: z.string().max(50).nullable().optional(),
});

const params = z.object({
  id: z.string(),
});

export const editOrganizationValidation = {
  body,
  params,
};
