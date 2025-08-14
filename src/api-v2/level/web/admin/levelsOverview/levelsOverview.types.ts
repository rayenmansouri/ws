import { LevelsOverviewValidation } from "./levelsOverview.validation";

export type LevelsOverviewRouteConfig = LevelsOverviewValidation & { files: never };

export type LevelsOverviewResponse = {
  _id: string & { _isID: true };
  name: string;
  newId: string;
  color: string;
  subLevelsOverview: {
    subLevel: {
      _id: string & { _isID: true };
      name: string;
      newId: string;
    };
    classNumber: number;
    studentNumber: number;
    teacherNumber: number;
  }[];
}[];
