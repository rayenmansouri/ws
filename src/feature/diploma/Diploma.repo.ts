import { BaseRepo } from "../../core/BaseRepo";
import { ResponseWithPagination } from "../../newDatabase/mongo/types";
import { ListOptions } from "../../types/types";
import { Diploma, DiplomaMetaData } from "./diploma.entity";

export abstract class DiplomaRepo extends BaseRepo<DiplomaMetaData> {
  abstract findOneByAverage(average: number): Promise<DiplomaMetaData["entity"] | null>;

  abstract findManyByNames(name: string[]): Promise<DiplomaMetaData["entity"][]>;

  abstract findOneByAverageBounds(
    minAverage: number,
    maxAverage: number,
  ): Promise<DiplomaMetaData["entity"] | null>;

  abstract listDiplomas(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Diploma>>;
}
