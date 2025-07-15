import { ID } from "../../../types/BaseEntity";

export type BarCodeConfigDto = {
  newId: string;
  _id: ID;
  name: string;
  numRows: number;
  numCodes: number;
  top: number;
  left: number;
  width: number;
  height: number;
};
