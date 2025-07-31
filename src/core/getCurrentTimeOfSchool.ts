import { schoolDocStore } from "./subdomainStore";

export const getCurrentTimeOfSchool = (schoolId: string): Date => {
  const schoolDoc = schoolDocStore[schoolId];

  const timeZone = schoolDoc.timeZone;

  const [hours, minutes, seconds] = new Date().toLocaleTimeString("en-GB", { timeZone: timeZone ?? undefined }).split(":");

  const currentTime = new Date();
  currentTime.setUTCHours(+hours, +minutes, +seconds);

  return currentTime;
};
export const getTimeOfSchool = (schoolId: string, date: Date): Date => {
  const schoolDoc = schoolDocStore[schoolId];

  const timeZone = schoolDoc.timeZone;

  const [hours, minutes, seconds] = new Date(date)
    .toLocaleTimeString("en-GB", { timeZone: timeZone ?? undefined })
    .slice(0, -2)
    .split(":");

  const currentTime = new Date(date);
  currentTime.setUTCHours(+hours, +minutes, +seconds);

  return currentTime;
};
