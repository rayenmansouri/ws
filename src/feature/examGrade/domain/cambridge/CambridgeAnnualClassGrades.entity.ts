import { ID } from "../../../../types/BaseEntity";
import { IAnnualClassGrades } from "../AnnualClassGrades.interface";
import { CambridgeTermClassGrades } from "./CambridgeTermClassGrades.entity";
import { CambridgeGrade } from "./CambridgeGrade.valueobject";

export class CambridgeAnnualClassGrades implements IAnnualClassGrades {
  class: {
    _id: ID;
    newId: string;
    name: string;
  };
  termClassGrades: CambridgeTermClassGrades[];
  studentIds: ID[];

  constructor(termClassGrades: CambridgeTermClassGrades[]) {
    this.termClassGrades = termClassGrades;
    this.studentIds = termClassGrades[0].studentIds;
    this.class = termClassGrades[0].class;
  }

  calculateStudentAnnualAverage(studentId: ID): CambridgeGrade {
    const termAverages = this.termClassGrades.map(termClassGrades =>
      termClassGrades.calculateStudentAverage(studentId),
    );

    const annualAverage = CambridgeGrade.calculateAverage(termAverages);

    return annualAverage;
  }
}
