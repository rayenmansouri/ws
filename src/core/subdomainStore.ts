import { School } from "../feature/schools/domain/school.entity";
import { container } from "./container/container";

interface SchoolDocStore {
  [key: string]: School;
}

export const schoolDocStore: SchoolDocStore = {};

export const initializeSubdomains = async () => {
  const schoolRepo = container.get("SchoolRepo");

  const schools = await schoolRepo.findAll();

  schools.forEach(school => {
    addSchoolToGlobalStore(school);
  });
};

export const addSchoolToGlobalStore = (school: School) => {
  schoolDocStore[school._id] = school;
};

export const removeSchoolFromGlobalStore = (schoolSubdomain: string) => {
  const schoolDoc = Object.values(schoolDocStore).find(
    school => school.subdomain === schoolSubdomain,
  );
  if (schoolDoc) delete schoolDocStore[schoolDoc._id];
};
