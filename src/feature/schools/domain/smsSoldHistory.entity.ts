import { School } from "./school.entity";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";
import { ID } from "./../../../types/BaseEntity";
import { Master } from "./../../masters/domain/master.entity";

export type SmsSoldHistory = {
  master: ID;
  smsCount: number;
  operation: "plus" | "minus";
  addedAt: Date;
  school: ID;
} & BaseEntity;

export type SmsSoldHistoryMetaData = GenerateMetaData<
  SmsSoldHistory,
  {
    master: Master;
    school: School;
  }
>;
