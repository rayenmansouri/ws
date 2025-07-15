import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { ClassType } from "../../classTypes/repo/classType.entity";
import { IFile } from "../../sessionManagement/domain/session.entity";

export type Signature = {
  name: string;
  image: IFile;
  classTypes: ID[];
  personName: string | null;
} & BaseEntity;

export type SignatureMetaData = GenerateMetaData<
  Signature,
  {
    classTypes: ClassType[];
  }
>;
