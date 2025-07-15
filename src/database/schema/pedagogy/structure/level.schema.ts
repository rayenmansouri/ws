import { TExamGradeSystemEnum } from "../../../../feature/levels/domains/level.entity";
import { createSchema } from "../../../../helpers/createSchema";
import { IEntity } from "../../../../types/entities";
import { ISchoolYear, schoolYearSchema } from "./schoolYear.schema";

export interface ILevel extends IEntity {
  name: string;
  currentSchoolYear: Omit<ISchoolYear, "level">;
  rank: number;
  color: string;
  establishmentTitle: string;
  examGradeSystem: TExamGradeSystemEnum;
}

export const levelSchema = createSchema<ILevel>({
  name: String,
  currentSchoolYear: schoolYearSchema,
  color: String,
  rank: { type: Number },
  establishmentTitle: String,
  examGradeSystem: String,
});
