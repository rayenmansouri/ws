# Configuration Validation with Zod

This directory contains configuration files that use Zod for runtime validation of environment variables.

## Overview

All configuration files now use Zod schemas to ensure that required environment variables are present and valid before the application starts. This prevents runtime errors caused by missing or invalid configuration.

## Files

- `backend-config.ts` - Backend URI configuration
- `database.config.ts` - Database connection configuration
- `index.ts` - Centralized exports

## Usage

### Importing Configurations

```typescript
import { backendUri, masterDabaseUri } from './configs';

// These values are guaranteed to be defined and valid
console.log(backendUri); // string
console.log(masterDabaseUri); // string
```

### Adding New Configuration

1. Create a new config file (e.g., `redis.config.ts`)
2. Use the utility functions from `../core/validation/config.validation`
3. Export the validated configuration

Example:

```typescript
import { validateEnvConfig, requiredString, requiredNumber } from "../core/validation/config.validation";
import dotenv from "dotenv";

dotenv.config();

const redisConfigSchema = z.object({
  REDIS_HOST: requiredString("REDIS_HOST"),
  REDIS_PORT: requiredNumber("REDIS_PORT"),
});

const redisConfig = validateEnvConfig(redisConfigSchema, {
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
});

export const redisHost = redisConfig.REDIS_HOST;
export const redisPort = redisConfig.REDIS_PORT;
```

## Available Validation Functions

- `requiredString(envVarName)` - Requires non-empty string
- `optionalString(envVarName)` - Optional string
- `requiredUrl(envVarName)` - Requires valid URL string
- `requiredNumber(envVarName)` - Requires valid number string (transforms to number)
- `requiredBoolean(envVarName)` - Requires 'true' or 'false' string (transforms to boolean)

## Error Handling

If any required environment variables are missing or invalid, the application will fail to start with a clear error message indicating which variables are problematic.

Example error:
```
Environment configuration validation failed: SERVE_STATIC_FILE must be defined and cannot be empty
```
