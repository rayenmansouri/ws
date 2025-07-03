import fs from "fs";
import path from "path";
import { API_DIRECTORY, WEB_SCHOOL_TYPES_DIRECTORY } from "../../../constants.mjs";
import { Logger } from "../../../helpers/logger.mjs";
import { capitalizeFirstLetter } from "../../../helpers/string.mjs";

export const exportAllRoutes = () => {
  const start = performance.now();
  let exportedRouteCounter = 0;

  try {
    initializeAutoExportDirectory();

    const features = fs.readdirSync(API_DIRECTORY);
    features.forEach(feature => {
      processFeature(feature);
    });
  } catch (err) {
    throw err;
  }

  const end = performance.now();
  const duration = end - start;
  Logger.info(`Exported ${exportedRouteCounter} routes in ${duration.toFixed(2)}ms`);

  function initializeAutoExportDirectory() {
    const autoExportDirectory = path.join(WEB_SCHOOL_TYPES_DIRECTORY, "autoExport");
    fs.rmSync(autoExportDirectory, { recursive: true, force: true });
    fs.mkdirSync(autoExportDirectory);
    fs.writeFileSync(path.join(autoExportDirectory, "index.ts"), "");
  }

  function processFeature(feature) {
    fs.mkdirSync(path.join(WEB_SCHOOL_TYPES_DIRECTORY, "autoExport", feature));
    const featurePath = path.join(API_DIRECTORY, feature);
    const platforms = fs.readdirSync(featurePath);
    platforms.forEach(platform => {
      processPlatform(feature, platform);
    });
  }

  function processPlatform(feature, platform) {
    if (platform === "shared") {
      const routesPath = path.join(API_DIRECTORY, feature, platform, "routes");
      if (!fs.existsSync(routesPath)) return;

      fs.mkdirSync(path.join(WEB_SCHOOL_TYPES_DIRECTORY, "autoExport", feature, "shared"));

      const routes = fs.readdirSync(routesPath);
      routes.forEach(route => {
        processSharedRoute(feature, route);
      });
      return;
    }

    if (platform === "mobile") return;

    fs.mkdirSync(path.join(WEB_SCHOOL_TYPES_DIRECTORY, "autoExport", feature, platform));
    const platformPath = path.join(API_DIRECTORY, feature, platform);
    const userTypes = fs.readdirSync(platformPath);
    userTypes.forEach(userType => {
      processUserType(feature, platform, userType);
    });
  }

  function processSharedRoute(feature, route) {
    const routeFilePath = path.join(
      API_DIRECTORY,
      feature,
      "shared",
      "routes",
      route,
      `${route}.route.ts`,
    );
    if (!fs.existsSync(routeFilePath)) return;

    const routeData = extractRouteData(routeFilePath);
    createSharedRouteExportFile(feature, route, routeData);
    updateIndexFileForSharedRoute(feature, route);
    exportedRouteCounter++;
  }

  function processUserType(feature, platform, userType) {
    fs.mkdirSync(path.join(WEB_SCHOOL_TYPES_DIRECTORY, "autoExport", feature, platform, userType));
    const userTypePath = path.join(API_DIRECTORY, feature, platform, userType);
    const routes = fs.readdirSync(userTypePath);
    routes.forEach(route => {
      processRoute(feature, platform, userType, route);
    });
  }

  function processRoute(feature, platform, userType, route) {
    const routeFilePath = path.join(
      API_DIRECTORY,
      feature,
      platform,
      userType,
      route,
      `${route}.route.ts`,
    );
    if (!fs.existsSync(routeFilePath)) return;

    const routeData = extractRouteData(routeFilePath);
    createRouteExportFile(feature, platform, userType, route, routeData);
    updateIndexFile(feature, platform, userType, route);
    exportedRouteCounter++;
  }

  function extractRouteData(routeFilePath) {
    const fileContent = fs.readFileSync(routeFilePath, "utf-8");
    const pathMatch = fileContent.match(/path:\s*["'`](.*?)["'`]/);
    const methodMatch = fileContent.match(/method:\s*["'`](.*?)["'`]/);
    return {
      path: pathMatch ? pathMatch[1] : "",
      method: methodMatch ? methodMatch[1].toUpperCase() : "",
    };
  }

  function createRouteExportFile(feature, platform, userType, route, routeData) {
    const capitalizedRoute = capitalizeFirstLetter(route);
    const capitalizedUserType = capitalizeFirstLetter(userType);

    const routeExportPath = path.join(
      WEB_SCHOOL_TYPES_DIRECTORY,
      "autoExport",
      feature,
      platform,
      userType,
      `${route}.ts`,
    );
    const params = routeData.path.match(/(?<=:)\w+/g) || [];
    const paramsKey = params.length ? `[${params.map(param => `"${param}"`).join(", ")}]` : "[]";

    const content = `import { ${capitalizedRoute}RouteConfig , ${capitalizedRoute}Response } from "../../../../../../src/api/${feature}/${platform}/${userType}/${route}/${route}.types";
    import { APIResponse } from "../../../../helpers.types";

    export const ${route}By${capitalizedUserType}Route = {
    path: "${routeData.path}",
    method: "${routeData.method}",
    paramsKey: ${paramsKey},
    };

    export type ${capitalizedRoute}By${capitalizedUserType}RouteTypes = ${capitalizedRoute}RouteConfig & {
    response: APIResponse<${capitalizedRoute}Response> 
    };
    `;
    fs.writeFileSync(routeExportPath, content);
  }

  function createSharedRouteExportFile(feature, route, routeData) {
    const capitalizedRoute = capitalizeFirstLetter(route);
    const routeExportPath = path.join(
      WEB_SCHOOL_TYPES_DIRECTORY,
      "autoExport",
      feature,
      "shared",
      `${route}.ts`,
    );
    const params = routeData.path.match(/(?<=:)\w+/g) || [];
    const paramsKey = params.length ? `[${params.map(param => `"${param}"`).join(", ")}]` : "[]";

    const content = `import { ${capitalizedRoute}RouteConfig , ${capitalizedRoute}Response } from "../../../../../src/api/${feature}/shared/routes/${route}/${route}.types";
    import { APIResponse } from "../../../helpers.types";

    export const ${route}Route = {
    path: "${routeData.path}",
    method: "${routeData.method}",
    paramsKey: ${paramsKey},
    };

    export type ${capitalizedRoute}RouteTypes = ${capitalizedRoute}RouteConfig & {
    response: APIResponse<${capitalizedRoute}Response> 
    };
    `;
    fs.writeFileSync(routeExportPath, content);
  }

  function createSharedRouteExportFile(feature, route, routeData) {
    const capitalizedRoute = capitalizeFirstLetter(route);
    const routeExportPath = path.join(
      WEB_SCHOOL_TYPES_DIRECTORY,
      "autoExport",
      feature,
      "shared",
      `${route}.ts`,
    );
    const params = routeData.path.match(/(?<=:)\w+/g) || [];
    const paramsKey = params.length ? `[${params.map(param => `"${param}"`).join(", ")}]` : "[]";

    const content = `import { ${capitalizedRoute}RouteConfig , ${capitalizedRoute}Response } from "../../../../../src/api/${feature}/shared/routes/${route}/${route}.types";
    import { APIResponse } from "../../../helpers.types";

    export const ${route}Route = {
    path: "${routeData.path}",
    method: "${routeData.method}",
    paramsKey: ${paramsKey},
    };

    export type ${capitalizedRoute}RouteTypes = ${capitalizedRoute}RouteConfig & {
    response: APIResponse<${capitalizedRoute}Response> 
    };
    `;
    fs.writeFileSync(routeExportPath, content);
  }

  function updateIndexFile(feature, platform, userType, route) {
    const exportStatement = `export * from "./${feature}/${platform}/${userType}/${route}";\n`;
    const indexPath = path.join(WEB_SCHOOL_TYPES_DIRECTORY, "autoExport", "index.ts");
    fs.appendFileSync(indexPath, exportStatement);
  }

  function updateIndexFileForSharedRoute(feature, route) {
    const exportStatement = `export * from "./${feature}/shared/${route}";\n`;
    const indexPath = path.join(WEB_SCHOOL_TYPES_DIRECTORY, "autoExport", "index.ts");
    fs.appendFileSync(indexPath, exportStatement);
  }
};
