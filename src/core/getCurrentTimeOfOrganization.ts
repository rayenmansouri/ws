import { organizationDocStore } from "./subdomainStore";

export const getCurrentTimeOfSchool = (organizationId: string): Date => {
  const schoolDoc = organizationDocStore[organizationId];

  const timeZone = schoolDoc.timeZone;

  const [hours, minutes, seconds] = new Date().toLocaleTimeString("en-GB", { timeZone: timeZone ?? undefined }).split(":");

  const currentTime = new Date();
  currentTime.setUTCHours(+hours, +minutes, +seconds);

  return currentTime;
};
export const getTimeOfSchool = (organizationId: string, date: Date): Date => {
  const schoolDoc = organizationDocStore[organizationId];

  const timeZone = schoolDoc.timeZone;

  const [hours, minutes, seconds] = new Date(date)
    .toLocaleTimeString("en-GB", { timeZone: timeZone ?? undefined })
    .slice(0, -2)
    .split(":");

  const currentTime = new Date(date);
  currentTime.setUTCHours(+hours, +minutes, +seconds);

  return currentTime;
};
