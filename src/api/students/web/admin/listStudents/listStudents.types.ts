import { StrictOmit } from "./../../../../../types/utils";
import { Populate } from "./../../../../../core/populateTypes";
import { StudentMetaData } from "../../../../../feature/students/domain/student.entity";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";
import { ListStudentsValidation } from "./listStudents.validation";

export type ListStudentsRouteConfig = ListStudentsValidation & { files: never };
export type ListStudentsResponse = ResponseWithPagination<
  Omit<
    StrictOmit<
      Populate<StudentMetaData, "classType" | "level" | "parents">,
      "password" | "passwordChangedAt"
    >,
    "avatar"
  > & { avatar: string }
>;
