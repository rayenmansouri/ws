import schedule from "node-schedule";
import { environment } from "../config";
import Logger from "../core/Logger";
import { ENVIRONMENT_ENUM } from "../helpers/constants";
import { rotateLogFiles } from "./rotateLogFiles";
import { container } from "../core/container/container";

const scheduleCron = (hour: number, minutes: number, callback: () => Promise<void>): void => {
  const rule = new schedule.RecurrenceRule();
  rule.hour = hour;
  rule.minute = minutes;

  schedule.scheduleJob(rule, async () => await callback());
};

export const initializeCrons = async (): Promise<void> => {
  if (environment !== ENVIRONMENT_ENUM.LOCAL) await globalCron();
  await rotateLogFiles();

  scheduleCron(23, 59, rotateLogFiles);
  scheduleCron(0, 0, globalCron);
};

export const globalCron = async (): Promise<void> => {
  Logger.info("GLOBAL CRON STARTED");

  const organizationRepo = container.get("SchoolRepo"); // Using legacy alias
  const allOrganizations = await organizationRepo.findAll();

  for (const organization of allOrganizations) {
    //If you need crone job for each organization, uncomment implement below
  }

  Logger.info("GLOBAL CRON COMPLETED");
};
