import { mkdirSync } from "fs";
import { FEATURE_DIRECTORY, PROJECT_DIRECTORY } from "../../../constants.mjs";
import { checkFileExistsRecursively } from "../../../helpers/fileSystem.mjs";
import { Logger } from "../../../helpers/logger.mjs";
import { createEntityFile } from "./entityFile.mjs";
import { createMongoRepoFile } from "./mongoRepoFile.mjs";
import { registerRepoToContainer } from "./registerRepoToContainer.mjs";
import { registerRepoToContainerRegistry } from "./registerRepoToContainerRegistry.mjs";
import { registerSchema } from "./registerSchema.mjs";
import { createRepoFile } from "./repoFile.mjs";
import { createSchemaFile } from "./schemaFile.mjs";

export const createEntity = async args => {
  const entityName = args.shift();

  if (!entityName) {
    Logger.error("Entity name is required");
    process.exit(1);
  }

  let featureName = argv.f;
  if (!featureName) {
    Logger.error("Feature name is required");
    process.exit(1);
  }

  const featurePath = path.join(FEATURE_DIRECTORY, featureName);
  const isFeatureExists = fs.existsSync(featurePath);
  if (!isFeatureExists) {
    Logger.error(`Feature folder "${featureName}" does not exist`);
    process.exit(1);
  }

  const isEntityExists = await checkFileExistsRecursively(
    PROJECT_DIRECTORY,
    `${entityName}.entity.ts`,
  );

  if (isEntityExists) {
    Logger.error(`Entity "${entityName}" already exists`);
    process.exit(1);
  }

  mkdirSync(path.join(featurePath, "domain"), { recursive: true });

  createEntityFile(entityName, featureName);
  createRepoFile(entityName, featureName);
  createSchemaFile(entityName, featureName);
  createMongoRepoFile(entityName, featureName);
  registerSchema(entityName, featureName);
  registerRepoToContainer(entityName, featureName);
  registerRepoToContainerRegistry(entityName, featureName);
};
