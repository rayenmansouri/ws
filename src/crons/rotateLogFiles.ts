import { appendFile, readFile, readdir, rm, writeFile } from "fs/promises";
import { join } from "path";
import { logsRetentionDays } from "../config";
import { sortArrayOfStringsAscending } from "../helpers/sortArrayByDate";
import logger from "../core/Logger";

const LOGS_FOLDER_PATH = join(__dirname, "..", "..", "logs");
const LOGS_OF_TODAY_FILE_NAME = "today.log";

export const rotateLogFiles = async () => {
  const currentDate = new Date().toISOString().slice(0, 10);

  const logsOfToday = await readFile(`${LOGS_FOLDER_PATH}/${LOGS_OF_TODAY_FILE_NAME}`);

  await appendFile(`${LOGS_FOLDER_PATH}/${currentDate}.log`, logsOfToday);

  await clearTodayLogFile();

  await deleteOldLogFiles();
};

const clearTodayLogFile = async () => {
  await writeFile(`${LOGS_FOLDER_PATH}/${LOGS_OF_TODAY_FILE_NAME}`, "");
};

const deleteOldLogFiles = async () => {
  const logFiles = (await readdir(LOGS_FOLDER_PATH)).filter(
    fileName => fileName !== LOGS_OF_TODAY_FILE_NAME,
  );

  const sortedLogFiles = sortArrayOfStringsAscending(logFiles);

  const numberOfSubDirectoriesToRemove = sortedLogFiles.length - logsRetentionDays;

  if (numberOfSubDirectoriesToRemove < 0) return;

  const logFilesToDelete = sortedLogFiles.slice(0, numberOfSubDirectoriesToRemove);

  for (const fileName of logFilesToDelete) {
    const filePath = join(LOGS_FOLDER_PATH, fileName);
    logger.info(`Deleting log file of ${fileName}`);
    await rm(filePath);
  }
};
