import { database_secret } from '../../config';
import Logger from '../../core/Logger';
import { ensureDirectoriesExist } from '../../helpers/ensureDirectoriesExist';
import { executeCommand } from '../../helpers/executeCommand';
import { getBackupFileNameAndPath } from './getBackupFileNameAndPath';

export const backupOneSchoolAndGetFileInformation = async (
  schoolSubdomain: string,
): Promise<{ fileName: string; filePath: string }> => {
  const { fileName, filePath } = getBackupFileNameAndPath(schoolSubdomain);

  await ensureDirectoriesExist(filePath);

  Logger.info(`Started doing backup for ${schoolSubdomain}`);

  await executeCommand(
    `mongodump --uri="${database_secret}" --authenticationDatabase=admin --db=${schoolSubdomain} --archive=${filePath}/${fileName}`,
  );

  Logger.info(`Completed doing backup for ${schoolSubdomain}`);

  return { fileName, filePath };
};
