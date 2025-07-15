import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ID } from "../../../../../types/BaseEntity";
import { ListUnenrolledStudentsValidation } from "./listUnenrolledStudents.validation";

export type ListUnenrolledStudentsRouteConfig = ListUnenrolledStudentsValidation & { files: never };
export type ListUnenrolledStudentsResponse = ResponseWithPagination<{
  _id: ID;
  newId: string;
  fullName: string;
  avatar: string;
  gender: string;
  phoneNumber: string | null;
  email: string | null;
}>;
