import { z } from "zod";

const createOrganization = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    subdomain: z.string().min(1),
    phoneNumber: z.string().min(1),
    directorName: z.string().min(1),
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

