import { ID } from "../../../../types/BaseEntity";
import { ITermClassGrades } from "../TermClassGrades.interface";
import { AutomaticPromotionGrade } from "./AutomaticPromotionGrade.valueobject";

export class AutomaticPromotionTermClassGrades implements ITermClassGrades {
  class: { _id: ID; newId: string; name: string };
  term: { _id: ID; newId: string; name: string; coefficient: number };
  studentIds: ID[];

  constructor({
    classDoc,
    term,
    studentIds,
  }: {
    classDoc: { _id: ID; newId: string; name: string };
    term: { _id: ID; newId: string; name: string; coefficient: number };
    studentIds: ID[];
  }) {
    this.class = classDoc;
    this.term = term;
    this.studentIds = studentIds;
  }

  getDegreesCoverage(): number {
    return this.studentIds.length;
  }

  calculateStudentAverage(): AutomaticPromotionGrade {
    return AutomaticPromotionGrade.create();
  }
}
