import {
  ClassOverviewDashboardDTO,
  CurrentSessionClassDashboardDTO,
} from "../../../../../feature/classes/dto/ClassDashboard.dto";
import {
  AttendanceTable,
  ObservationGivenTable,
  SessionCanceledTable,
} from "../../../../../feature/dashboards/dtos/AdminDashboard.dto";
import { TabName } from "../../../../../feature/dashboards/useCases/getAdminDashboard.usecase";
import { GetClassDashboardValidation } from "./getClassDashboard.validation";

export type GetClassDashboardRouteConfig = GetClassDashboardValidation & { files: never };
export type GetClassDashboardResponse = {
  classOverView: ClassOverviewDashboardDTO;
  currentSession: CurrentSessionClassDashboardDTO | null;
  tabStats: {
    tabName: TabName;
    chartData: { tag: string; percentage: number }[];
    tableData: (AttendanceTable | ObservationGivenTable | SessionCanceledTable)[];
  };
};
