import schedule from "node-schedule";
import { backupMasterAndCentralDB } from "./../features/backup/backupAllOrganizations";
import { backupEndAt, backupStartAt, numberOfHoursBetweenBackups } from "../config";
import { backupAllOrganizations } from "../features/backup/backupAllOrganizations";

export const initializeBackupCron = async () => {
  const rule = new schedule.RecurrenceRule();
  rule.hour = new schedule.Range(backupStartAt, backupEndAt, numberOfHoursBetweenBackups);
  rule.minute = 0;

  schedule.scheduleJob(rule, async () => {
    await backupAllOrganizations();
    await backupMasterAndCentralDB();
  });
};
