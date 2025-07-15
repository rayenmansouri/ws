import { StrictOmit } from "../types/utils";

export const omitObject = <T extends object, K extends keyof T>(
  obj: T,
  fields: K[],
): StrictOmit<T, K> => {
  const newObj = Object.assign(obj);
  fields.forEach(field => {
    newObj[field] = undefined;
  });
  return newObj;
};
