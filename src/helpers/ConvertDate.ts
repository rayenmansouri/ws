import { getCurrentTimeOfOrganization } from '../core/getCurrentTimeOfOrganization';

export const convertDateToServerTime = (date: Date, organizationId: string) => {
  const currentTimeOfOrganization = getCurrentTimeOfOrganization(organizationId);
  const currentServerTime = new Date();

  const difference = currentTimeOfOrganization.getTime() - currentServerTime.getTime();

  const convertedDate = new Date(date.getTime() - difference);
  return convertedDate;
};
