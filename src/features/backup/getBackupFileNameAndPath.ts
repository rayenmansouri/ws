import { join } from 'path';
import { backupFolderName } from './constants';

export const getBackupFileNameAndPath = (
  organizationSubdomain: string,
): { fileName: string; filePath: string } => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toISOString().slice(11, 16);

  const fileName = `${organizationSubdomain}_${currentDate}_${currentTime}.archive`;

  const filePath = join(
    __dirname,
    '..',
    '..',
    '..',
    backupFolderName,
    organizationSubdomain,
    currentDate,
  );

  return { fileName, filePath };
};
