import { getNewTenantConnection } from "../database/connectionDB/tenantPoolConnection";
import { container } from "./container/container";

interface SchoolDocStore {
  [key: string]: any;
}

export const schoolDocStore: SchoolDocStore = {};

export const initializeSubdomains = async () => {
  const organizationRepo = container.get("OrganizationRepository");

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
