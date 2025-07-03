import { mkdir } from 'fs/promises';

export const ensureDirectoriesExist = async (path: string): Promise<void> => {
  await mkdir(path, { recursive: true });
};
