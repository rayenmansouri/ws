import { ID } from "../../../../../types/BaseEntity";
import { IAnnualClassGrades } from "../../AnnualClassGrades.interface";
import { Grade } from "../Grade.valueobject";
import { PrimaryTermClassGrades } from "./PrimaryTermClassGrades.entity";

export class PrimaryAnnualClassGrades implements IAnnualClassGrades {
  class: {
    _id: ID;
    newId: string;
    name: string;
  };
  termClassGrades: PrimaryTermClassGrades[];
  studentIds: ID[];

  constructor(termClassGrades: PrimaryTermClassGrades[]) {
    this.termClassGrades = termClassGrades;
    this.studentIds = termClassGrades[0].studentIds;
    this.class = termClassGrades[0].class;
  }

  calculateStudentAnnualAverage(studentId: ID): Grade {
    const termAverages = this.termClassGrades.map(termClassGrades =>
      termClassGrades.calculateStudentAverage(studentId),
    );

    const annualAverage = Grade.calculateAverage(termAverages);

    return annualAverage;
  }
}
