import { getCurrentTimeOfOrganization } from '../core/getCurrentTimeOfOrganization';

export const convertDateToServerTime = (date: Date, organizationId: string) => {
  const currentTimeOfSchool = getCurrentTimeOfOrganization(organizationId);
  const currentServerTime = new Date();

  const difference = currentTimeOfSchool.getTime() - currentServerTime.getTime();

  const convertedDate = new Date(date.getTime() - difference);
  return convertedDate;
};
