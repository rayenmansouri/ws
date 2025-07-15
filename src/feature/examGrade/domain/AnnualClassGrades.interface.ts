import { ID } from "../../../types/BaseEntity";
import { IGrade } from "./Grade.interface";
import { ITermClassGrades } from "./TermClassGrades.interface";

export interface IAnnualClassGrades {
  class: {
    _id: ID;
    newId: string;
    name: string;
  };
  termClassGrades: ITermClassGrades[];
  studentIds: ID[];

  calculateStudentAnnualAverage(studentId: ID): IGrade;
}
