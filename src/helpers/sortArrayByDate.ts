export const sortArrayOfStringsAscending = (array: string[]) => {
  return array.sort((a, b) => (a > b ? 1 : -1));
};
