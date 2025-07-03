import path from "path";
import { API_DIRECTORY, FEATURE_DIRECTORY, PROJECT_DIRECTORY } from "../../constants.mjs";
import { Logger } from "../../helpers/logger.mjs";
import { createUseCaseFile } from "./createUsecaseFile.mjs";
import { addUseCaseToContainerRegistry } from "./addToContainerRegistry.mjs";
import { addUseCaseToContainer } from "./addToContainer.mjs";
import { checkFileExistsRecursively, findDirectoriesByName } from "../../helpers/fileSystem.mjs";
import { capitalizeFirstLetter } from "../../helpers/string.mjs";

export const createUseCase = async args => {
  const useCaseName = args.shift();
  const isForced = argv.force || false;
  const featureName = argv.f;

  if (!useCaseName) {
    Logger.error("Use case name is required");
    process.exit(1);
  }

  if (!featureName) {
    Logger.error("Feature name is required");
    process.exit(1);
  }

  const capitalizedUseCaseName = capitalizeFirstLetter(useCaseName);

  const isUseCaseFileExist = await checkFileExistsRecursively(
    PROJECT_DIRECTORY,
    `${capitalizedUseCaseName}.usecase.ts`,
  );

  if (isUseCaseFileExist) {
    Logger.error(`Use case "${useCaseName}" already exists`);
    process.exit(1);
  }

  const featureDirectory = path.join(FEATURE_DIRECTORY, featureName);

  const isFeatureExists = fs.existsSync(featureDirectory);

  const useCaseDirectory = path.join(featureDirectory, "useCases");

  if (!isFeatureExists && !isForced) {
    Logger.error(`Feature folder "${featureName}" does not exist`);
    process.exit(1);
  } else if (!isFeatureExists && isForced) {
    fs.mkdirSync(featureDirectory);
  }
  fs.mkdirSync(useCaseDirectory, { recursive: true });
  const useCaseFilePath = path.join(useCaseDirectory, `${capitalizedUseCaseName}.usecase.ts`);

  createUseCaseFile(useCaseName, useCaseFilePath);

  const useCaseRelativePath = useCaseFilePath
    .replace(`${PROJECT_DIRECTORY}/src`, "../..")
    .replace(".ts", "");

  addUseCaseToContainerRegistry(useCaseName, useCaseRelativePath);
  addUseCaseToContainer(useCaseName, useCaseRelativePath);
};
