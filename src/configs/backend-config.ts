import { z } from "zod";
import { validateEnvConfig, requiredString } from "../core/validation/config.validation";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define the backend configuration schema
const backendConfigSchema = z.object({
  SERVE_STATIC_FILE: requiredString("SERVE_STATIC_FILE"),
});

// Validate environment variables
const backendConfig = validateEnvConfig(backendConfigSchema, {
  SERVE_STATIC_FILE: process.env.SERVE_STATIC_FILE,
});

export const backendUri = backendConfig.SERVE_STATIC_FILE;