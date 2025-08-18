import { database_secret } from '../../config';
import Logger from '../../core/Logger';
import { ensureDirectoriesExist } from '../../helpers/ensureDirectoriesExist';
import { executeCommand } from '../../helpers/executeCommand';
import { getBackupFileNameAndPath } from './getBackupFileNameAndPath';

export const backupOneOrganizationAndGetFileInformation = async (
  organizationSubdomain: string,
): Promise<{ fileName: string; filePath: string }> => {
  const { fileName, filePath } = getBackupFileNameAndPath(organizationSubdomain);

  await ensureDirectoriesExist(filePath);

  Logger.info(`Started doing backup for ${organizationSubdomain}`);

  await executeCommand(
    `mongodump --uri="${database_secret}" --authenticationDatabase=admin --db=${organizationSubdomain} --archive=${filePath}/${fileName}`,
  );

  Logger.info(`Completed doing backup for ${organizationSubdomain}`);

  return { fileName, filePath };
};
