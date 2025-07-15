import { ID } from "../../../types/BaseEntity";

export type GradeReportTemplateDTO = {
  _id: ID;
  newId: string;
  name: string;
  subjects: {
    _id: ID;
    newId: string;
    name: string;
  }[];
  classTypes: {
    _id: ID;
    newId: string;
    name: string;
  }[];
  isDefault: boolean;
  isBuiltIn: boolean;
};
