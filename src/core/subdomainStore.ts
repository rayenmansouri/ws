import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../feature/organization-magement/constant";
import { OrganizationRepository } from "../feature/organization-magement/domain/organization.repo";
import { container } from "./container/container";

interface SchoolDocStore {
  [key: string]: any;
}

export const schoolDocStore: SchoolDocStore = {};

export const initializeSubdomains = async () => {
  const organizationRepo = container.get<OrganizationRepository>(ORGANIZATION_REPOSITORY_IDENTIFIER);

  const organizations = await organizationRepo.findAll();

  for(const organization of organizations){
    await getNewTenantConnection(organization.subdomain);
    addSchoolToGlobalStore(organization);
  }
};

export const addSchoolToGlobalStore = (school: any) => {
  schoolDocStore[school.id] = school;
};

export const removeSchoolFromGlobalStore = (schoolSubdomain: string) => {
  const schoolDoc = Object.values(schoolDocStore).find(
    school => school.subdomain === schoolSubdomain,
  );
  if (schoolDoc) delete schoolDocStore[schoolDoc.id];
};
