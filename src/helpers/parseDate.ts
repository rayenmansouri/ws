import { isPlainObject } from "lodash";
import moment from "moment";
import logger from "../core/Logger";

export const parseDate = (body: any): any => {
  if (Array.isArray(body)) {
    return body.map(item => parseDate(item));
  }

  if (typeof body === "string" && body?.endsWith("Z") && moment(body).isValid()) {
    logger.error("Field failed to parse due to his instance", body);
  }
  if (isPlainObject(body)) {
    const newBody: any = {};
    for (const [key, value] of Object.entries(body)) {
      newBody[key] = parseDate(value);
    }
    return newBody;
  }

  if (body instanceof Date) {
    return body.toISOString().split(".")[0];
  }

  return body;
};
