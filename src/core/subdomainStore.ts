import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../feature/organization-magement/constant";
import { OrganizationRepository } from "../feature/organization-magement/domain/organization.repo";
import { container } from "./container/container";

interface OrganizationDocStore {
  [key: string]: any;
}

export const organizationDocStore: OrganizationDocStore = {};
// Legacy alias for backward compatibility
export const schoolDocStore = organizationDocStore;

export const initializeSubdomains = async () => {
  const organizationRepo = container.get<OrganizationRepository>(ORGANIZATION_REPOSITORY_IDENTIFIER);

  const organizations = await organizationRepo.findAll();

  for(const organization of organizations){
    await getNewTenantConnection(organization.subdomain);
    addOrganizationToGlobalStore(organization);
  }
};

export const addOrganizationToGlobalStore = (organization: any) => {
  organizationDocStore[organization.id] = organization;
};

export const removeOrganizationFromGlobalStore = (organizationSubdomain: string) => {
  const organizationDoc = Object.values(organizationDocStore).find(
    organization => organization.subdomain === organizationSubdomain,
  );
  if (organizationDoc) delete organizationDocStore[organizationDoc.id];
};

// Legacy aliases for backward compatibility
export const addSchoolToGlobalStore = addOrganizationToGlobalStore;
export const removeSchoolFromGlobalStore = removeOrganizationFromGlobalStore;
