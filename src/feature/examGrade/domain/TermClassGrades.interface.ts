import { ID } from "../../../types/BaseEntity";
import { IGrade } from "./Grade.interface";

export interface ITermClassGrades {
  class: {
    _id: ID;
    newId: string;
    name: string;
  };
  term: {
    _id: ID;
    newId: string;
    name: string;
    coefficient: number;
  };
  studentIds: ID[];

  calculateStudentAverage(studentId: ID): IGrade;

  getDegreesCoverage(): number;
}
