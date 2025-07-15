import { TGetSubjectsOfTeacherClassValidation } from "../../validations/teacher/getSubjectsOfTeacherClass.validation";
import { TGetTeacherSubjectsOfClassByAdminResponse } from "../admin/getTeacherSubjectsOfClassByAdmin.types";

export type TGetSubjectsOfTeacherClassRouteConfig = TGetSubjectsOfTeacherClassValidation;
export type TGetSubjectsOfTeacherClassResponse = TGetTeacherSubjectsOfClassByAdminResponse;
