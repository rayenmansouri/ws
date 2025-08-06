#!/usr/bin/env node -r zx/globals

import { executeEntityActions } from "./entity/actions.mjs";
import { Logger } from "./helpers/logger.mjs";
import { executeRouteAction } from "./route/actions.mjs";
import { executeUseCaseAction } from "./usecase/actions.mjs";

export const args = argv._;

const resource = args.shift();

switch (resource) {
  case "route":
    executeRouteAction(args);
    break;
  case "entity":
    await executeEntityActions(args);
    break;
  case "usecase":
    await executeUseCaseAction(args);
    break;
  default:
    Logger.error(`Invalid resource: ${resource}`);
    process.exit(1);
}
