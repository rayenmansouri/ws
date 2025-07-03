import {
  ClientSession,
  Connection,
  FilterQuery,
  PipelineStage,
  UpdateQueryKnownOnly,
} from "mongoose";
import { entityInterfaces } from "../entityInterfaces";
import { handleQueryOptions } from "../helpers/handleQueryOptions";
import { QueryOptions } from "../types";

export const crudRepo = <I extends keyof entityInterfaces>(connection: Connection, entity: I) => {
  type EntityInterface = entityInterfaces[I];

  type UpdateQuery =
    | (Partial<entityInterfaces[I]> & UpdateQueryKnownOnly<entityInterfaces[I]>)
    | { [key: string]: any };
  return {
    findMany: async (
      condition: FilterQuery<EntityInterface>,
      options?: QueryOptions<EntityInterface>,
    ): Promise<EntityInterface[]> => {
      const mongooseQuery = connection.model<EntityInterface>(entity).find(condition).lean();

      if (options) {
        handleQueryOptions(mongooseQuery, options);
      }

      return (await mongooseQuery) as unknown as Promise<EntityInterface[]>;
    },

    findOne: async (
      condition: FilterQuery<EntityInterface>,
      options?: QueryOptions<EntityInterface>,
    ): Promise<entityInterfaces[I]> => {
      const mongooseQuery = connection.model<EntityInterface>(entity).findOne(condition).lean();

      if (options) {
        handleQueryOptions(mongooseQuery, options);
      }
      return (await mongooseQuery) as unknown as Promise<EntityInterface>;
    },
    distinct: async <F extends keyof EntityInterface>(
      field: F,
      condition: FilterQuery<EntityInterface>,
      options?: QueryOptions<EntityInterface>,
    ): Promise<Array<EntityInterface[F]>> => {
      const mongooseQuery = connection
        .model<EntityInterface>(entity)
        .distinct(field as string, condition)
        .lean();

      if (options) {
        handleQueryOptions(mongooseQuery, options);
      }

      return (await mongooseQuery) as unknown as Array<EntityInterface[F]>;
    },
    updateOne: async (
      condition: FilterQuery<EntityInterface>,
      payload: UpdateQuery,
      session: ClientSession | null = null,
    ): Promise<EntityInterface> => {
      return (await connection
        .model(entity)
        .findOneAndUpdate(condition, payload, {
          new: true,
          session,
        })
        .lean()) as unknown as Promise<EntityInterface>;
    },

    updateMany: async (
      condition: FilterQuery<EntityInterface>,
      payload: UpdateQuery,
      session?: ClientSession,
      updateOptions?: object,
    ): Promise<EntityInterface[]> => {
      return await connection
        .model(entity)
        .updateMany({ ...condition }, payload, { new: true, session, ...updateOptions })
        .lean();
    },

    addOne: async (
      data: Partial<entityInterfaces[I]>,
      session?: ClientSession,
    ): Promise<EntityInterface> => {
      const result = await connection.model(entity).create([data], { session });
      return result[0].toObject();
    },

    addMany: async (
      data: Partial<entityInterfaces[I]>[],
      session?: ClientSession,
    ): Promise<void> => {
      const collectionName = connection.model(entity).collection.name;

      const counterDoc = await connection
        .model("counter")
        .findOne({ collectionName }, undefined, { session });

      data.forEach((item: any) => {
        ++counterDoc.count;
        item.newId = counterDoc.count.toString().padStart(5, "0");
      });

      await connection.model(entity).insertMany(data, { session });
      await counterDoc.save({ session });
      return;
    },

    hardDeleteOne: async (
      condition: FilterQuery<EntityInterface>,
      session?: ClientSession,
    ): Promise<void> => {
      await connection.model(entity).deleteOne(condition, { session });
      return;
    },

    hardDeleteMany: async (
      condition: FilterQuery<EntityInterface>,
      session?: ClientSession,
    ): Promise<void> => {
      await connection.model(entity).deleteMany(condition, { session });
      return;
    },

    count: async (condition: FilterQuery<EntityInterface>): Promise<number> => {
      return await connection.model(entity).count(condition);
    },

    aggregation: async <T = any>(
      pipeline: PipelineStage[],
      session?: ClientSession,
    ): Promise<T[]> => {
      return await connection.model(entity).aggregate(pipeline, { session: session || null });
    },
    bulkWrite: async (bulkOperation: any[], session?: ClientSession): Promise<void> => {
      await connection.model(entity).bulkWrite(bulkOperation, { session });
    },
  };
};
