import { TGetFutureSessionOfTeacherValidation } from "./../../validations/admin/getFutureSessionOfTeacher.validation";
import { ISession } from "./../../../../database/schema/pedagogy/session/session.schema";
export type TGetFutureSessionOfTeacherResponse = ISession[];
export type TGetFutureSessionOfTeacherRouteConfig = TGetFutureSessionOfTeacherValidation;
