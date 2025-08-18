import { readdir, rm } from 'fs/promises';
import { join } from 'path';
import Logger from '../../core/Logger';
import { backupRetentionDays } from '../../config';
import { backupFolderName } from './constants';
import { sortArrayOfStringsAscending } from '../../helpers/sortArrayByDate';

export const localBackupRotation = async (organizationSubdomain: string) => {
  const schoolDirectory = join(__dirname, '..', '..', '..', backupFolderName, organizationSubdomain);
  const subDirectories = await readdir(schoolDirectory);

  const sortedSubDirectories = sortArrayOfStringsAscending(subDirectories);

  const numberOfSubDirectoriesToRemove = sortedSubDirectories.length - backupRetentionDays;

  if (numberOfSubDirectoriesToRemove < 0) return;

  const subDirectoriesToDelete = sortedSubDirectories.slice(0, numberOfSubDirectoriesToRemove);

  for (const directoryName of subDirectoriesToDelete) {
    const directoryPath = join(schoolDirectory, directoryName);
    Logger.info(`Deleting all backups in local folder ${directoryName} for ${organizationSubdomain}`);
    await rm(directoryPath, { recursive: true });
  }
};
