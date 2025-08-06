import pino from "pino";
import { ENVIRONMENT_ENUM, TEnvironmentEnum } from "../helpers/constants";
import { environment } from "../config";

type logLevels = "trace" | "debug" | "info" | "warn" | "error" | "fatal" | "silent";

const environmentLogLevels: Record<TEnvironmentEnum, logLevels> = {
  [ENVIRONMENT_ENUM.LOCAL]: "trace",
  [ENVIRONMENT_ENUM.TEST]: "fatal",
  [ENVIRONMENT_ENUM.DEV]: "trace",
  [ENVIRONMENT_ENUM.STAGING]: "trace",
  [ENVIRONMENT_ENUM.PROD]: "trace",
};

const transports = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: {
        destination: `${__dirname}/../../logs/today.log`,
        mkdir: true,
      },
      level: "debug",
    },
    {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: false,
      },
      level: "debug",
    },
  ],
});

const logger = pino(
  {
    base: undefined,
    timestamp: () =>
      `, "time" : "${new Date().toLocaleString("en-GB", { timeZone: "Africa/Tunis" })}"`,
    level: environmentLogLevels[environment] || "info",
  },
  transports,
);

export default logger;
