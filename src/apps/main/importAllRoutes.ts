import fs from "fs";
import path from "path";
import logger from "../../core/Logger";

const fileRoutesPaths = `${__dirname}/Routes.routes.ts`;
const fileExtension = path.extname(__filename);

export function importAllRoutes(folderPath: string): void {
  if (fileExtension !== ".ts") return;
  let routeCounter = 0;
  const importStatements: string[] = [];
  function scanDirectoryForRoutes(dir: string): void {
    return fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      const isDirectory = fs.statSync(fullPath).isDirectory();
      if (isDirectory) {
        scanDirectoryForRoutes(fullPath);
      } else if (file.endsWith(`route${fileExtension}`)) {
        const relativePath = extractRelativePath(fullPath);
        const importStatement = `import "${relativePath}"`;
        importStatements.push(importStatement);
        routeCounter++;
      }
    });
  }

  const start = performance.now();
  scanDirectoryForRoutes(folderPath);
  const end = performance.now();
  const duration = end - start;

  fs.writeFileSync(fileRoutesPaths, importStatements.join("\n").toString());
  logger.info(`Imported ${routeCounter} routes in ${duration.toFixed(2)}ms`);
}

function extractRelativePath(str: string): string {
  return `../..${str.replace(/^.*?src/, "")}`.replace("route.ts", "route");
}
