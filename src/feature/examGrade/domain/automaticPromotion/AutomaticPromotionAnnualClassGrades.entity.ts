import { ID } from "../../../../types/BaseEntity";
import { IAnnualClassGrades } from "../AnnualClassGrades.interface";
import { IGrade } from "../Grade.interface";
import { AutomaticPromotionGrade } from "./AutomaticPromotionGrade.valueobject";
import { AutomaticPromotionTermClassGrades } from "./AutomaticPromotionTermClassGrades.entity";

export class AutomaticPromotionAnnualClassGrades implements IAnnualClassGrades {
  class: { _id: ID; newId: string; name: string };
  termClassGrades: AutomaticPromotionTermClassGrades[];
  studentIds: ID[];

  constructor(termClassGrades: AutomaticPromotionTermClassGrades[]) {
    this.termClassGrades = termClassGrades;
    this.studentIds = termClassGrades[0].studentIds;
    this.class = termClassGrades[0].class;
  }

  calculateStudentAnnualAverage(): IGrade {
    return AutomaticPromotionGrade.create();
  }
}
