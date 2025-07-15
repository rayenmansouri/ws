import { WeeklySessionDTO } from "../../weeklySessions/dto/weeklySession.dto";

export type SmartCalendarPdfDTO = {
  teachers: {
    _id: string;
    name: string;
    sessions: WeeklySessionDTO[];
  }[];
  classes: {
    _id: string;
    name: string;
    sessions: WeeklySessionDTO[];
  }[];
  classrooms: {
    _id: string;
    name: string;
    sessions: WeeklySessionDTO[];
  }[];
};
