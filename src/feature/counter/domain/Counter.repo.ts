import { BaseRepo } from "../../../core/BaseRepo";
import { CounterMetaData } from "./counter.entity";

export abstract class CounterRepo extends BaseRepo<CounterMetaData> {}
