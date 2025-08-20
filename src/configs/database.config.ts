import { z } from "zod";
import { validateEnvConfig, requiredString } from "../core/validation/config.validation";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define the database configuration schema
const databaseConfigSchema = z.object({
  MONGODB_URI: requiredString("MONGODB_URI"),
});

// Validate environment variables
const databaseConfig = validateEnvConfig(databaseConfigSchema, {
  MONGODB_URI: process.env.MONGODB_URI,
});

export const masterDabaseUri = `${databaseConfig.MONGODB_URI}&dbName=master`;
export const getDatabaseUri = (tenantId: string) => {
    return `${databaseConfig.MONGODB_URI}&dbName=${tenantId}`;
};
