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
  let isShared = argv.shared || false;

  if (!featureName) {
    Logger.error("Feature name is required");
    process.exit(1);
  } else {
    const featurePath = path.join(API_DIRECTORY, featureName);
    const isFeatureExists = fs.existsSync(featurePath);

    if (!isFeatureExists && !isForced) {
      Logger.error(`Feature folder "${featureName}" does not exist`);
      process.exit(1);
    }

    if (!isFeatureExists && isForced) {
      fs.mkdirSync(featurePath);

      PLATFORMS.forEach(platform => {
        fs.mkdirSync(path.join(featurePath, platform));
      });
    }
  }

  if (!platform && !isShared) {
    Logger.error("Platform is required");
    process.exit(1);
  } else if (!isShared) {
    if (!PLATFORMS.includes(platform)) {
      Logger.error("Invalid platform");
      process.exit(1);
    }
  }

  if (!userType && !isShared) {
    Logger.error("User type is required");
    process.exit(1);
  } else if (!isShared) {
    if (!USER_TYPES.includes(userType)) {
      Logger.error("Invalid user type");
      process.exit(1);
    }
  }

  const paths = findDirectoriesByName(API_DIRECTORY, routeName);

  paths.forEach(path => {
    if (path.includes(userType) && platform !== "mobile") {
      Logger.error(`Route "${routeName}" already exists`);
      process.exit(1);
    }
  });

  if (isShared) {
    const routeDirectoryPath = path.join(API_DIRECTORY, featureName, "shared", "routes", routeName);
    fs.mkdirSync(routeDirectoryPath, { recursive: true });
    createSharedRouteFile(routeName, routeDirectoryPath);
    createControllerFile(routeName, routeDirectoryPath);
    createTypesFile(routeName, routeDirectoryPath);
    createValidationFile(routeName, routeDirectoryPath);
  } else {
    const routeDirectoryPath = path.join(API_DIRECTORY, featureName, platform, userType, routeName);
    fs.mkdirSync(routeDirectoryPath, { recursive: true });
    createRouteFile(routeName, userType, platform, routeDirectoryPath);
    createControllerFile(routeName, routeDirectoryPath);
    createTypesFile(routeName, routeDirectoryPath);
    createValidationFile(routeName, routeDirectoryPath);
  }
};
