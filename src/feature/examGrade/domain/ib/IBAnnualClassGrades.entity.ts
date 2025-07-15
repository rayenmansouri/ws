import { ID } from "../../../../types/BaseEntity";
import { IAnnualClassGrades } from "../AnnualClassGrades.interface";
import { IBClassAverage } from "./IBClassAverage.valueobject";
import { IBTermClassGrades } from "./IBTermClassGrades.entity";

export class IBAnnualClassGrades implements IAnnualClassGrades {
  class: {
    _id: ID;
    newId: string;
    name: string;
  };
  termClassGrades: IBTermClassGrades[];
  studentIds: ID[];

  constructor(termClassGrades: IBTermClassGrades[]) {
    this.termClassGrades = termClassGrades;
    this.studentIds = termClassGrades[0].studentIds;
    this.class = termClassGrades[0].class;
  }

  calculateStudentAnnualAverage(studentId: ID): IBClassAverage {
    const termAverages = this.termClassGrades.map(termClassGrades =>
      termClassGrades.calculateStudentAverage(studentId),
    );

    const annualAverage = IBClassAverage.createAnnualAverage(termAverages);

    return annualAverage;
  }
}
