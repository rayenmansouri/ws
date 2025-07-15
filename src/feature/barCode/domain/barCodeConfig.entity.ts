import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type BarCodeConfig = {
  name: string;
  numRows: number;
  numCodes: number;
  top: number;
  left: number;
  width: number;
  height: number;
} & BaseEntity;

export type BarCodeConfigMetaData = GenerateMetaData<BarCodeConfig, never>;
