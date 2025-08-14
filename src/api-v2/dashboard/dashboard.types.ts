import { GetDashboardValidation } from "./dashboard.validation";

export type AdminDashboardDTO = {
    totalClasses: number;
    totalStudentsCount: number;
    unaffectedStudentsCount: number;
    affectedStudentsCount: number;
    totalParents: number;
    totalTeachers: number;
    staffCount: number;
    levels: { name: string; _id: string }[];
    subLevels: {
      name: string;
      totalClasses: number;
      totalStudents: number;
      affectedStudents: number;
      unaffectedStudents: number;
      newId: string;
    }[];
};
export type GetDashboardRouteConfig = GetDashboardValidation & { files: never }
export type GetDashboardResponse = AdminDashboardDTO