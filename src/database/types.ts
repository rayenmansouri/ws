import { ClientSession, ObjectId, PopulateOptions } from "mongoose";
import { IEntity } from "../types/entities";
import { BaseEntity, ID } from "../types/BaseEntity";

export type populatedFieldsOfInterface<I> = keyof {
  [K in keyof I as I[K] extends
    | ObjectId
    | ID
    | ID[]
    | ObjectId[]
    | (ObjectId | null)
    | (ObjectId | undefined)
    ? K
    : never]: I[K];
};

export type QueryObject = Record<string, string | undefined>;

export type SelectEnum = "1" | "0" | "-1";

export interface QueryOptions<I> {
  sort?: { [K in keyof I]?: 1 | -1 };
  populate?: populatedFieldsOfInterface<I>[];
  limit?: number;
  select?: { [K in keyof I]?: SelectEnum };
  session?: ClientSession;
  populateNested?: PopulateOptions;
}

export type populateInterface<
  I extends IEntity | BaseEntity,
  K extends Partial<
    Record<
      populatedFieldsOfInterface<I>,
      IEntity | IEntity[] | (IEntity | null) | object | BaseEntity | BaseEntity[] | Partial<IEntity>
    >
  >,
> = {
  [F in keyof I]: I[F] extends ObjectId | ObjectId[] | (ObjectId | null) | (ObjectId | undefined)
    ? F extends keyof K
      ? K[F]
      : I[F]
    : I[F];
};
