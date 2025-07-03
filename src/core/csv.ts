import Papa from "papaparse";
import { z } from "zod";
import { BadRequestError } from "./ApplicationErrors";
import { fromZodError } from "zod-validation-error";

export const parseCsv = <T extends z.ZodTypeAny>(
  file: Buffer,
  validationSchema: T,
): z.infer<T>[] => {
  const csvString = file.toString("utf-8");

  const results = Papa.parse(csvString, {
    header: true,
  });

  if (results.errors.length > 0) {
    const error = results.errors[0];
    throw new BadRequestError(`${error.message} at row: ${error.row + 1}`);
  }

  const processedData = results.data.map(row => {
    const processedRow = { ...(row as Record<string, unknown>) };
    for (const key in processedRow) {
      if (processedRow[key] === "") {
        processedRow[key] = undefined;
      }
    }
    return processedRow;
  });

  for (let i = 0; i < processedData.length; i++) {
    const object = processedData[i];

    const validationResult = validationSchema.safeParse(object);

    if (!validationResult.success) {
      const error = fromZodError(validationResult.error, {
        maxIssuesInMessage: 3,
        includePath: false,
      })
        .message.replace(/"([^"]*)"/g, "$1")
        .replace("Validation error: ", "")
        .trimEnd();

      throw new BadRequestError(`Validation error`, { row: i + 1, error });
    }
  }

  return processedData;
};
