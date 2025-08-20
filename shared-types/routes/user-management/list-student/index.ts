import { ListStudentResponse } from "../../../../src/api-v2/user-management/list-student/list-student.types";

export const listStudentRouteObject = {
    path: "/students",
    method: "get",
    paramsKey: [],
};

export type ListStudentRouteType = {
  path: string;
  method: string;
  paramsKey: string[];
  body?: unknown;
  params?: unknown;
  query?: unknown;
  files?: unknown;
  response: {
    status: string;
    message: string;
    data: ListStudentResponse;
  };
}
