import { z } from "zod";
import { CarCountryEnum, CeresCountryEnum, DncCountryEnum, LibanCountryEnum, OrganizationSystemType, SesameCountryEnum, TFeatureFlagsEnum, ZoneTemplate } from "../enums";

const baseOrganizationFields = {
    name: z.string().min(1),
    email: z.string().email(),
    subdomain: z.string().min(1),
    phoneNumber: z.string().min(1),
    directorName: z.string().min(1),
    address: z.string().min(1).optional(),
    enableEmail: z.boolean().optional(),
    enableSms: z.boolean().optional(),
    zonetemplate: z.nativeEnum(ZoneTemplate).optional(),
    maxStudentSeats: z.number().optional(),
    website: z.string().optional(),
};

// Conditional validation schema using discriminated union based on organizationSystemType
export const createOrganization = z.discriminatedUnion("organizationSystemType", [
    // For DNC organizations - country must be from DncCountryEnum
    z.object({
        ...baseOrganizationFields,
        organizationSystemType: z.literal(OrganizationSystemType.DNC),
        country: z.nativeEnum(DncCountryEnum),
    }),
    // For LIBAN organizations - country must be from LibanCountryEnum
    z.object({
        ...baseOrganizationFields,
        organizationSystemType: z.literal(OrganizationSystemType.LIBAN),
        country: z.nativeEnum(LibanCountryEnum),
    }),
    // For CAR organizations - country must be from CarCountryEnum
    z.object({
        ...baseOrganizationFields,
        organizationSystemType: z.literal(OrganizationSystemType.CAR),
        country: z.nativeEnum(CarCountryEnum),
    }),
    // For SESAME organizations - country must be from SesameCountryEnum
    z.object({
        ...baseOrganizationFields,
        organizationSystemType: z.literal(OrganizationSystemType.SESAME),
        country: z.nativeEnum(SesameCountryEnum),
    }),
    // For CERES organizations - country must be from CeresCountryEnum
    z.object({
        ...baseOrganizationFields,
        organizationSystemType: z.literal(OrganizationSystemType.CERES),
        country: z.nativeEnum(CeresCountryEnum),
    }),
    // For DEFAULT organizations - country is a free string
    z.object({
        ...baseOrganizationFields,
        organizationSystemType: z.literal(OrganizationSystemType.DEFAULT),
        country: z.string().min(1, "Country is required"),
    })
]);

