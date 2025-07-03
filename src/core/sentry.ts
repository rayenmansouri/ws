import * as Sentry from "@sentry/node";
import { environment, sentryDSN } from "../config";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: sentryDSN,
  environment: environment,
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(),
    Sentry.requestDataIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
