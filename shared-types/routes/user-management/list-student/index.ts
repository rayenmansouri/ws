import { ListStudentResponse } from "../../../../src/api-v2/user-management/list-student/list-student.types";

export const listStudentRouteObject = {
    path: "/students",
    method: "get",
    paramsKey: [],
};

export type ListStudentRouteType = {
  response: ListStudentResponse
}
