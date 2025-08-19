import { GetDashboardValidation } from "./dashboard.validation";

export type AdminDashboardDTO = {
  affectedStudentsCount: number;
  unaffectedStudentsCount: number;
  totalTeachers: number;
  totalStudentsCount: number;
  totalParents: number;
  totalClasses: number;
  staffCount: number;
  levels: Array<{
    _id: string;
    name: string;
  }>;
  tabStats: {
    chartData: Array<{
      name: string;
      data: number[];
    }>;
    tableData: Array<{
      _id: number;
      totalTeenagers: number;
    }>;
  };
};
export type GetDashboardRouteConfig = GetDashboardValidation & { files: never }
export type GetDashboardResponse = AdminDashboardDTO