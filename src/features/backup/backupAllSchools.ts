import { shouldUploadBackup } from "../../config";
import { container } from "../../core/container/container";
import { backupOneSchoolAndGetFileInformation } from "./backupOneSchool";
import { localBackupRotation } from "./localBackupRetention";
import { remoteBackupRotation } from "./remoteBackupRetention";
import { uploadBackup } from "./uploadBackup";

export const backupAllSchools = async (): Promise<void> => {
  const schoolRepo = container.get("SchoolRepo");
  const allSchools = await schoolRepo.findAll();

  for (const school of allSchools) {
    const { fileName, filePath } = await backupOneSchoolAndGetFileInformation(school.subdomain);
    await localBackupRotation(school.subdomain);

    if (shouldUploadBackup) {
      await uploadBackup(fileName, filePath);
      await remoteBackupRotation(school.subdomain);
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
