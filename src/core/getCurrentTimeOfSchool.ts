import { organizationDocStore, schoolDocStore } from "./subdomainStore";

export const getCurrentTimeOfOrganization = (organizationId: string): Date => {
  const organizationDoc = organizationDocStore[organizationId];

  const timeZone = organizationDoc.timeZone;

  const [hours, minutes, seconds] = new Date().toLocaleTimeString("en-GB", { timeZone: timeZone ?? undefined }).split(":");

  const currentTime = new Date();
  currentTime.setUTCHours(+hours, +minutes, +seconds);

  return currentTime;
};

export const getTimeOfOrganization = (organizationId: string, date: Date): Date => {
  const organizationDoc = organizationDocStore[organizationId];

  const timeZone = organizationDoc.timeZone;

  const [hours, minutes, seconds] = new Date(date)
    .toLocaleTimeString("en-GB", { timeZone: timeZone ?? undefined })
    .slice(0, -2)
    .split(":");

  const currentTime = new Date(date);
  currentTime.setUTCHours(+hours, +minutes, +seconds);

  return currentTime;
};

// Legacy functions for backward compatibility
export const getCurrentTimeOfSchool = getCurrentTimeOfOrganization;
export const getTimeOfSchool = getTimeOfOrganization;
