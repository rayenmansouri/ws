import { LANGUAGE_ENUM } from "../../translation/constants";
import { EventDispatcher } from "../domainEvents/EventDispatcher";
import { HandlerSubscriber } from "../domainEvents/HandlerSubscriber";
import { DropboxFileManager } from "../../shared/infrastructure/DropboxFileManager";
import { container } from "./container";
import { registerUseCases } from "./registerUseCases";
import { registerUseRepos } from "./registerUseRepos";

export const registerAllDependencies = (): void => {
  container.bind("FileManager").to(DropboxFileManager);
  container.bind("Session").toConstantValue(undefined);
  container.bind("Language").toConstantValue(LANGUAGE_ENUM.ENGLISH);
  container.bind("EventDispatcher").to(EventDispatcher).inSingletonScope();
  container.bind("HandlerSubscriber").to(HandlerSubscriber).inSingletonScope();

  registerUseCases();
  registerUseRepos();
};
