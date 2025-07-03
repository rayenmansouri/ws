import { readdirSync } from "fs";
import path from "path";

export const findDirectoriesByName = (directory, dirName) => {
  const results = [];

  const searchDirectories = currentDir => {
    const entries = readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === dirName) {
          results.push(fullPath);
        }
        searchDirectories(fullPath);
      }
    }
  };

  searchDirectories(directory);
  return results;
};

export const checkFileExistsRecursively = async (dir, fileName) => {
  try {
    const { stdout } = await $`find ${dir} -name ${fileName}`;
    return stdout.trim().length > 0;
  } catch (error) {
    return false;
  }
};
