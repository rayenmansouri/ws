import { container } from "./container/container";

interface SchoolDocStore {
  [key: string]: any;
}

export const schoolDocStore: SchoolDocStore = {};

export const initializeSubdomains = async () => {
  const schoolRepo = container.get("SchoolRepository");

  const schools = await schoolRepo.findAll();

  schools.forEach(school => {
    addSchoolToGlobalStore(school);
  });
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
