import { shouldUploadBackup } from "../../config";
import { container } from "../../core/container/container";
import { backupOneSchoolAndGetFileInformation } from "./backupOneSchool";
import { localBackupRotation } from "./localBackupRetention";
import { remoteBackupRotation } from "./remoteBackupRetention";
import { uploadBackup } from "./uploadBackup";
import { OrganizationRepository } from "../../feature/organization-magement/domain/organization.repo";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../feature/organization-magement/constant";

export const backupAllSchools = async (): Promise<void> => {
  const organizationRepo = container.get<OrganizationRepository>(ORGANIZATION_REPOSITORY_IDENTIFIER);
  const allOrganizations = await organizationRepo.findAll();

  for (const organization of allOrganizations) {
    const { fileName, filePath } = await backupOneSchoolAndGetFileInformation(organization.subdomain);
    await localBackupRotation(organization.subdomain);

    if (shouldUploadBackup) {
      await uploadBackup(fileName, filePath);
      await remoteBackupRotation(organization.subdomain);
    }
  }
};

export const backupMasterAndCentralDB = async (): Promise<void> => {
  for (const dbName of ["master", "central"]) {
    const { fileName, filePath } = await backupOneSchoolAndGetFileInformation(dbName);
    await localBackupRotation(dbName);

    if (shouldUploadBackup) {
      await uploadBackup(fileName, filePath);
      await remoteBackupRotation(dbName);
    }
  }
};
