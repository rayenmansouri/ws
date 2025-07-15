import { EntityDto } from "../../entity/dto/entity.dto";

export type LevelOverviewDto = EntityDto & {
  color: string;
  subLevelsOverview: {
    subLevel: EntityDto;
    classNumber: number;
    studentNumber: number;
    teacherNumber: number;
  }[];
};
