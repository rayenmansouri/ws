import schedule from "node-schedule";
import { backupMasterAndCentralDB } from "./../features/backup/backupAllSchools";
import { backupEndAt, backupStartAt, numberOfHoursBetweenBackups } from "../config";
import { backupAllSchools } from "../features/backup/backupAllSchools";

export const initializeBackupCron = async () => {
  const rule = new schedule.RecurrenceRule();
  rule.hour = new schedule.Range(backupStartAt, backupEndAt, numberOfHoursBetweenBackups);
  rule.minute = 0;

  schedule.scheduleJob(rule, async () => {
    await backupAllSchools();
    await backupMasterAndCentralDB();
  });
};
