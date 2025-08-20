import { NextFunction } from "express";
import { BadRequestError } from "../../ApplicationErrors";
import { TypedRequest } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";

/**
 * Enhanced query parameter parser that handles:
 * - JSON query parameters
 * - Array parameters (comma-separated)
 * - Boolean parameters
 * - Number parameters
 * - Date parameters
 * - Pagination parameters
 * - Search parameters
 */
export const parseQuery = asyncHandlerForMiddleware((req: TypedRequest, _, next: NextFunction) => {
  try {
    // Get the raw query from the request
    const rawQuery = req.query || {};
    
    // Handle special JSON query parameter
    const jsonValue = (rawQuery as any)?.JSON;
    if (jsonValue && typeof jsonValue === 'string') {
      try {
        const parsedJSON = JSON.parse(jsonValue);
        // Merge parsed JSON with existing query
        Object.assign(rawQuery, parsedJSON);
        delete (rawQuery as any).JSON;
      } catch {
        next(new BadRequestError("global.invalidJSON"));
        return;
      }
    }

    // Parse and transform query parameters
    const transformedQuery: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(rawQuery)) {
      if (value === undefined || value === null) {
        continue;
      }

      const stringValue = Array.isArray(value) ? value[0] : value;
      
      // Handle array parameters (comma-separated)
      if (typeof stringValue === 'string' && stringValue.includes(',')) {
        transformedQuery[key] = stringValue.split(',').map(item => item.trim());
        continue;
      }

      // Handle boolean parameters
      if (stringValue === 'true' || stringValue === 'false') {
        transformedQuery[key] = stringValue === 'true';
        continue;
      }

      // Handle number parameters
      if (!isNaN(Number(stringValue)) && stringValue !== '') {
        const numValue = Number(stringValue);
        transformedQuery[key] = numValue;
        continue;
      }

      // Handle date parameters
      if (typeof stringValue === 'string' && isValidDate(stringValue)) {
        transformedQuery[key] = new Date(stringValue);
        continue;
      }

      // Handle empty strings and convert to undefined for optional parameters
      if (stringValue === '') {
        transformedQuery[key] = undefined;
        continue;
      }

      // Keep original value for other cases
      transformedQuery[key] = stringValue;
    }

    // Clean up undefined values
    Object.keys(transformedQuery).forEach(key => {
      if (transformedQuery[key] === undefined) {
        delete transformedQuery[key];
      }
    });

    // Update the request query with transformed values
    (req as any).query = transformedQuery;
    next();
  } catch {
    next(new BadRequestError("global.invalidQueryParameters"));
  }
});

/**
 * Helper function to check if a string is a valid date
 */
function isValidDate(dateString: string): boolean {
  if (!dateString || typeof dateString !== 'string') {
    return false;
  }
  
  // Check for ISO date format
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(dateString)) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
  
  // Check for date-only format (YYYY-MM-DD)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
  
  // Check for timestamp
  if (/^\d{10,13}$/.test(dateString)) {
    const timestamp = parseInt(dateString);
    const date = new Date(timestamp);
    return !isNaN(date.getTime());
  }
  
  return false;
}

/**
 * Legacy parseQuery function for backward compatibility
 * @deprecated Use parseQuery instead
 */
export const parseQueryLegacy = asyncHandlerForMiddleware((req: TypedRequest, _, next: NextFunction) => {
  // @ts-expect-error - This is needed to parse the JSON
  const queryJSON = req.query?.JSON as string | undefined;

  if (queryJSON) {
    try {
      req.query = JSON.parse(queryJSON);
    } catch {
      next(new BadRequestError("global.invalidJSON"));
    }
  } else req.query = {};

  next();
});
