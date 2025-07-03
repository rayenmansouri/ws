import schedule from "node-schedule";
import { environment } from "../config";
import Logger from "../core/Logger";
import { getTenantCon } from "../database/connectionDB/tenantPoolConnection";
import { ENVIRONMENT_ENUM } from "../helpers/constants";
import { handleOverdueInvoices, invoiceReminderCron, handleScheduledPosts } from "./callbacks";
import { rotateLogFiles } from "./rotateLogFiles";
import {
  markExpiredHomeworkAsDone,
  handleInProgressSessions,
  handlePastSessions,
} from "./session.jobs";
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
  scheduleCron(10, 0, () => invoiceReminderCron(3));
  scheduleCron(10, 0, () => invoiceReminderCron(1));
};

export const globalCron = async (): Promise<void> => {
  Logger.info("GLOBAL CRON STARTED");

  const schoolRepo = container.get("SchoolRepo");
  const allSchools = await schoolRepo.findAll();

  for (const school of allSchools) {
    const connection = await getTenantCon(school.subdomain);

    await handlePastSessions(connection, school._id);

    await handleInProgressSessions(connection, school._id);

    await markExpiredHomeworkAsDone(connection, school._id);

    await handleOverdueInvoices(connection, school._id);

    await handleScheduledPosts(connection, school._id);
  }

  Logger.info("GLOBAL CRON COMPLETED");
};
