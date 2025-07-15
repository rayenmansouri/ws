import { TGetFutureSessionsValidation } from "../../validations/admin/getFutureSessions.validation";
import { ISession } from "./../../../../database/schema/pedagogy/session/session.schema";

export type TGetFutureSessionsResponse = ISession[];

export type TGetFutureSessionsRouteConfig = TGetFutureSessionsValidation;
