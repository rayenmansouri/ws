import { z } from "zod";

import { createOrganization } from "../../../feature/organization-magement/domain/organization.validation";



type TCreateOrganization = z.infer<typeof createOrganization>;

export type OrganizationValidation = {
    body: TCreateOrganization;
    params: never;
    query: never;
};
 
export const organizationValidation = {
    createOrganization,
};

