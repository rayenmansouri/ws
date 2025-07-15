import { TTopicTypeEnum } from "../../../../feature/examGrade/domain/tunisian/ExamGrade.entity";
import { TGetSubjectsOfClassByAdminValidation } from "../../validations/admin/getSubjectsOfClassByAdmin.validation";

export type TGetTeacherSubjectsOfClassByAdminRouteConfig = TGetSubjectsOfClassByAdminValidation;

export type TGetTeacherSubjectsOfClassByAdminResponse = {
  classId: string;
  classNewId: string;
  className: string;
  terms: { _id: string; newId: string; name: string; type: TTopicTypeEnum }[];
};
