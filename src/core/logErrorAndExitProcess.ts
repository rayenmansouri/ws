import logger from "./Logger";

export const logCompilationErrorAndExitProcess = (error: Error) => {
  logger.error(error);
  process.exit(1);
};
