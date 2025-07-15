import { ID } from "../../../types/BaseEntity";
import { IFile } from "../../sessionManagement/domain/session.entity";

export type SignatureDto = {
  _id: ID;
  newId: string;
  name: string;
  personName: string | null;
  image: IFile;
  classTypes: {
    _id: ID;
    newId: string;
    name: string;
  }[];
};
