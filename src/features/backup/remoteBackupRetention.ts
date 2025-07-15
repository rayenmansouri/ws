import { join } from 'path';
import Logger from '../../core/Logger';
import { backupRetentionDays, environment } from '../../config';
import { backupFolderName } from './constants';
import { sortArrayOfStringsAscending } from '../../helpers/sortArrayByDate';
import { deleteDirectory } from '../../core/dropbox/deleteDirectory';
import { getSubDirectoriesOfPath } from '../../core/dropbox/getSubDirectoriesOfPath';

export const remoteBackupRotation = async (schoolSubdomain: string) => {
  const schoolDirectory = join('/', environment, schoolSubdomain, backupFolderName);

  const subDirectories = await getSubDirectoriesOfPath(schoolDirectory);

  const sortedSubDirectories = sortArrayOfStringsAscending(subDirectories);

  const numberOfSubDirectoriesToRemove = sortedSubDirectories.length - backupRetentionDays;

  if (numberOfSubDirectoriesToRemove < 0) return;

  const subDirectoriesToDelete = sortedSubDirectories.slice(0, numberOfSubDirectoriesToRemove);

  for (const directoryName of subDirectoriesToDelete) {
    const directoryPath = join(schoolDirectory, directoryName);
    Logger.info(`Deleting all backups in remote folder ${directoryName} for ${schoolSubdomain}`);
    await deleteDirectory(directoryPath);
  }
};
