import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (error, ctx) => {
  if (error.code === "too_small" && error.type === "array")
    return { message: `the ${error.path[0]} are not enough` };

  if (error.code === "too_big" && error.type === "array")
    return { message: `the number of ${error.path[0]} is too big` };
  if (error.code === "invalid_enum_value") return { message: `invalid ${error.path[0]}` };
  return { message: `${ctx.defaultError} at ${error.path[0]} ` };
};
z.setErrorMap(customErrorMap);

// Utility function for validating environment variables
export const validateEnvConfig = <T extends z.ZodTypeAny>(
  schema: T,
  envVars: Record<string, string | undefined>
): z.infer<T> => {
  try {
    return schema.parse(envVars);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      throw new Error(`Environment configuration validation failed: ${errorMessage}`);
    }
    throw error;
  }
};

// Common environment variable schemas
export const requiredString = (envVarName: string) => 
  z.string().min(1, `${envVarName} must be defined and cannot be empty`);

export const optionalString = (envVarName: string) => 
  z.string().optional();

export const requiredUrl = (envVarName: string) => 
  z.string().url(`${envVarName} must be a valid URL`).min(1, `${envVarName} must be defined`);

export const requiredNumber = (envVarName: string) => 
  z.string().transform((val) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      throw new Error(`${envVarName} must be a valid number`);
    }
    return num;
  });

export const requiredBoolean = (envVarName: string) => 
  z.string().min(1, `${envVarName} must be defined`).transform((val) => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    throw new Error(`${envVarName} must be 'true' or 'false'`);
  });
