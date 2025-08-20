import "zx/globals";
import fs from "fs";
import path from "path";
import { API_DIRECTORY, PLATFORMS, USER_TYPES } from "../../../constants.mjs";
import { findDirectoriesByName } from "../../../helpers/fileSystem.mjs";
import { Logger } from "../../../helpers/logger.mjs";
import { createControllerFile } from "./controllerFile.mjs";
import { createRouteFile } from "./routeFile.mjs";
import { createSharedRouteFile } from "./sharedRouteFile.mjs";
import { createTypesFile } from "./typesFile.mjs";
import { createValidationFile } from "./validationFile.mjs";

export const createRoute = args => {
  const routeName = args.shift();
  if (!routeName) {
    Logger.error("Route name is required");
    process.exit(1);
  }

  let platform = argv.p;
  let userType = argv.u;
  let featureName = argv.f;
  let isForced = argv.force || false;

  // Validate required parameters
  if (!featureName) {
    Logger.error("Feature name is required");
    process.exit(1);
  }

  if (!platform) {
    Logger.error("Platform is required");
    process.exit(1);
  } else {
    if (!PLATFORMS.includes(platform)) {
      Logger.error("Invalid platform");
      process.exit(1);
    }
  }

  if (!userType) {
    Logger.error("User type is required");
    process.exit(1);
  } else {
    if (!USER_TYPES.includes(userType)) {
      Logger.error("Invalid user type");
      process.exit(1);
    }
  }

  // New v2 structure: flat directory under api-v2/feature-name/
  const featurePath = path.join(API_DIRECTORY, featureName);
  const isFeatureExists = fs.existsSync(featurePath);

  if (!isFeatureExists && !isForced) {
    Logger.error(`Feature folder "${featureName}" does not exist`);
    process.exit(1);
  }

  if (!isFeatureExists && isForced) {
    fs.mkdirSync(featurePath, { recursive: true });
  }

  // Check if route already exists in the feature directory
  const existingFiles = fs.readdirSync(featurePath).filter(file => 
    file.includes(routeName) && (file.endsWith('.controller.ts') || file.endsWith('.route.ts'))
  );

  if (existingFiles.length > 0 && !isForced) {
    Logger.error(`Route "${routeName}" already exists in feature "${featureName}"`);
    process.exit(1);
  }

  // Create files directly in the feature directory (new v2 structure)
  createRouteFile(routeName, userType, platform, featurePath);
  createControllerFile(routeName, featurePath);
  createTypesFile(routeName, featurePath);
  createValidationFile(routeName, featurePath);
};
