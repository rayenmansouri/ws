import { z } from "zod";
import { OrganizationSystemType, ZoneTemplate } from "../../../feature/organization-magement/enums";

const createOrganization = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    subdomain: z.string().min(1),
    phoneNumber: z.string().min(1),
    directorName: z.string().min(1),
    organizationSystemType: z.nativeEnum(OrganizationSystemType),
    zonetemplate: z.nativeEnum(ZoneTemplate).optional(),
});

type TCreateOrganization = z.infer<typeof createOrganization>;

export type OrganizationValidation = {
    body: TCreateOrganization;
    params: never;
    query: never;
};
 
export const organizationValidation = {
    createOrganization,
};

