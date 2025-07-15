import { IClassGroup } from "../../../../database/schema/pedagogy/class/classGroup.schema";
import { populateInterface } from "../../../../database/types";
import { TGetFutureSessionByTeacherValidation } from "../../validations/teacher/getFutureSessionByTeacher.validation";
import { ISession } from "./../../../../database/schema/pedagogy/session/session.schema";

export type TGetFutureSessionByTeacherResponse = populateInterface<
  ISession,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  { classGroup: IClassGroup | null }
>[];
export type TGetFutureSessionByTeacherRouteConfig = TGetFutureSessionByTeacherValidation;
