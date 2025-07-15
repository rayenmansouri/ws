import { Query } from "mongoose";
import { QueryOptions, SelectEnum } from "../types";

const selectOperator = {
  "-1": "-",
  "0": "",
  "1": "+",
};

export const handleQueryOptions = <I>(
  mongooseQuery: Query<any, any>,
  options: QueryOptions<I>,
): void => {
  if (options.limit) {
    mongooseQuery.limit(options.limit);
  }

  if (options.populate) {
    const populateString = options.populate.join(" ");
    mongooseQuery.populate(populateString);
  }

  if (options.populateNested) {
    mongooseQuery.populate(options.populateNested);
  }

  if (options.select) {
    let selectString = "";
    // @ts-ignore
    Object.entries(options.select).forEach(([key, value]: [string, SelectEnum]) => {
      selectString += `${selectOperator[value]}${key} `;
    });
    mongooseQuery.select(selectString);
  }

  if (options.sort) {
    mongooseQuery.sort(options.sort as any);
  }

  if (options.session) {
    mongooseQuery.session(options.session);
  }
};
