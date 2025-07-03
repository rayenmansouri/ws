import { ObjectId } from "mongoose";
import { stringToObjectId } from "./stringToObjectId";

export const removeDuplicateIds = (arrayIds: (ObjectId | string)[]): ObjectId[] => {
  const newArray = arrayIds.map(id => id.toString());

  const noDuplicateArray = Array.from(new Set(newArray));

  return noDuplicateArray.map(id => stringToObjectId(id));
};
