import { getCurrentTimeOfSchool } from '../core/getCurrentTimeOfSchool';

export const convertDateToServerTime = (date: Date, schoolId: string) => {
  const currentTimeOfSchool = getCurrentTimeOfSchool(schoolId);
  const currentServerTime = new Date();

  const difference = currentTimeOfSchool.getTime() - currentServerTime.getTime();

  const convertedDate = new Date(date.getTime() - difference);
  return convertedDate;
};
