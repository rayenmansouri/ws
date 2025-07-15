export interface IMonthWithYear {
  month: number;
  year: number;
}

export const getMonthsBetweenDates = (startDate: Date, endDate: Date): IMonthWithYear[] => {
  const monthsWithYear: IMonthWithYear[] = [];

  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  let currentMonth = startDate.getMonth() + 1;
  let currentYear = startDate.getFullYear();

  const endMonth = endDate.getMonth() - 1;
  const endYear = endDate.getFullYear();

  while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
    monthsWithYear.push({ month: currentMonth, year: currentYear });
    currentMonth++;

    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }

  return monthsWithYear;
};
