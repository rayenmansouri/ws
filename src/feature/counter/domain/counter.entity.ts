import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../shared/domain/baseEntity";

export type Counter = {
  count: number;
} & BaseEntity;

export type CounterMetaData = GenerateMetaData<Counter, never>;
