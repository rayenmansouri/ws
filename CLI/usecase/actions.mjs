import { Logger } from "../helpers/logger.mjs";
import { createUseCase } from "./create/create.mjs";

export const executeUseCaseAction = async args => {
  const action = args.shift();

  switch (action) {
    case "create":
      await createUseCase(args);
      break;
    default:
      Logger.error(`Unknown action: ${action}`);
      process.exit(1);
  }
};
