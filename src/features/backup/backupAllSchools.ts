import { shouldUploadBackup } from "../../config";
import { container } from "../../core/container/container";
import { backupOneSchoolAndGetFileInformation } from "./backupOneSchool";
import { localBackupRotation } from "./localBackupRetention";
import { remoteBackupRotation } from "./remoteBackupRetention";
import { uploadBackup } from "./uploadBackup";

export const backupAllOrganizations = async (): Promise<void> => {
  const organizationRepo = container.get("SchoolRepo"); // Using legacy alias
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

// Legacy alias for backward compatibility
export const backupAllSchools = backupAllOrganizations;

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
