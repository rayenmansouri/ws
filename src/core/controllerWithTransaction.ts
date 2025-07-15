import mongoose from "mongoose";
import { ControllerWithTransaction, RouteContext } from "./Routes/createRoutes";
import { APISuccessResponse } from "./responseAPI/APISuccessResponse";

export const controllerWithTransaction = (controller: ControllerWithTransaction<any>) => {
  return async (routeContext: RouteContext<any>): Promise<APISuccessResponse> => {
    const session = await mongoose.startSession();
    try {
      const routeContextWithSession = {
        ...routeContext,
        session,
      };
      session.startTransaction();
      const apiResponse = await controller(routeContextWithSession);
      await session.commitTransaction();
      return apiResponse;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  };
};
