import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type SessionType = {
  name: string;
} & BaseEntity;

export type SessionTypeMetaData = GenerateMetaData<SessionType, never>;
