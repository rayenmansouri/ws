import { ENVIRONMENT_ENUM } from "./shared/enum";
import admin from "firebase-admin";

export let FCM: admin.app.App;

export const initializeFCM = (): void => {
  if (process.env.NODE_ENV != ENVIRONMENT_ENUM.TEST) {
    FCM = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FCM_PROJECT_ID,
        clientEmail: process.env.FCM_CLIENT_EMAIL,
        privateKey: process.env.FCM_PRIVATE_KEY
          ? process.env.FCM_PRIVATE_KEY.replace(/\\n/g, "\n")
          : undefined,
      }),
    });
  }
};
