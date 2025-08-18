import { readFile } from 'fs/promises';
import { join } from 'path';
import { environment } from '../../config';
import Logger from '../../core/Logger';
import { backupFolderName } from './constants';
import { uploadFileToDropbox } from '../../core/dropbox/uploadFileToDropbox';

export const uploadBackup = async (fileName: string, filePath: string) => {
  const [organizationSubdomain, backupDay] = fileName.split('_');

  const backupFileFullPath = join(filePath, fileName);
  const backupFileBuffer = await readFile(backupFileFullPath);

  Logger.info(`Uploading backup ${fileName}`);

  const uploadPath = `/${environment}/${organizationSubdomain}/${backupFolderName}/${backupDay}/${fileName}`;
  await uploadFileToDropbox(backupFileBuffer, uploadPath);

  Logger.info(`Finished uploading backup ${fileName}`);

  return;
};
