import { injectable, unmanaged } from "inversify";
import { ObjectId } from "mongodb";
import {
  ClientSession,
  Connection,
  FilterQuery,
  Model,
  PipelineStage,
  PopulateOptions,
  SortOrder,
} from "mongoose";
import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { EntityMetaData, ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { allMongoSchemas } from "../schemas/allMongoSchemas";
import { ResponseWithPagination } from "../types";
import { MongoCounterRepo } from "./MongoCounter.repo";

@injectable()
export abstract class MongoBaseRepo<MetaData extends EntityMetaData> extends BaseRepo<MetaData> {
  protected model: Model<MetaData["entity"]>;

  constructor(
    @unmanaged() connection: Connection,
    @unmanaged() entityName: keyof typeof allMongoSchemas,
    @unmanaged() protected session: ClientSession | null,
  ) {
    const model = connection.model(entityName) as Model<MetaData["entity"]>;
    const counterRepo = new MongoCounterRepo(connection, model.collection.name);
    super(counterRepo);
    this.model = model;
  }

  async findOneByNewId<FieldsToPopulate extends keyof MetaData["populatedFields"] = never>(
    newId: string,
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<MetaData, FieldsToPopulate> | null> {
    const query = this.model.findOne({ newId });

    if (this.session) query.session(this.session);

    if (options?.populate) query.populate(options?.populate as string[]);
    const entity = await query;

    return entity as Populate<MetaData, FieldsToPopulate> | null;
  }

  async findManyByNewIds<FieldsToPopulate extends keyof MetaData["populatedFields"] = never>(
    newIds: string[],
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<MetaData, FieldsToPopulate>[]> {
    const query = this.model.find({ newId: { $in: newIds } });

    if (this.session) query.session(this.session);

    if (options?.populate) query.populate(options?.populate as string[]);

    const entity = await query;

    return entity as Populate<MetaData, FieldsToPopulate>[];
  }

  async findOneById<FieldsToPopulate extends keyof MetaData["populatedFields"] = never>(
    id: string,
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<MetaData, FieldsToPopulate> | null> {
    const query = this.model.findOne({ _id: id });

    if (this.session) query.session(this.session);

    if (options?.populate) query.populate(options?.populate as string[]);

    const entity = await query;

    return entity as Populate<MetaData, FieldsToPopulate> | null;
  }

  async findManyByIds<FieldsToPopulate extends keyof MetaData["populatedFields"] = never>(
    ids: string[],
    options?: {
      populate?: FieldsToPopulate[];
    },
  ): Promise<Populate<MetaData, FieldsToPopulate>[]> {
    const query = this.model.find({ _id: { $in: ids } });

    if (this.session) query.session(this.session);

    if (options?.populate) query.populate(options?.populate as string[]);

    const entity = await query;

    return entity as Populate<MetaData, FieldsToPopulate>[];
  }

  async findAll<FieldsToPopulate extends keyof MetaData["populatedFields"] = never>(options?: {
    populate?: FieldsToPopulate[];
  }): Promise<Populate<MetaData, FieldsToPopulate>[]> {
    const query = this.model.find({});

    if (this.session) query.session(this.session);

    if (options?.populate) query.populate(options?.populate as string[]);
    const entity = await query;

    return entity as Populate<MetaData, FieldsToPopulate>[];
  }

  protected async baseAddOne(payload: MetaData["entity"]): Promise<MetaData["entity"]> {
    const entity = (
      await this.model.create([payload], { session: this.session || undefined })
    )[0].toObject();

    return entity;
  }

  protected async baseAddMany(payload: MetaData["entity"][]): Promise<void> {
    await this.model.insertMany(payload, { session: this.session || undefined });
  }

  protected async findOneByField<T extends keyof MetaData["entity"]>(
    field: T,
    value: MetaData["entity"][T],
  ): Promise<MetaData["entity"] | null> {
    const query = this.model.findOne({ [field as symbol]: value });

    if (this.session) query.session(this.session);

    const entity = await query;

    return entity;
  }

  protected async baseUpdateOneById(
    id: string,
    payload: Partial<MetaData["entity"]>,
  ): Promise<MetaData["entity"] | null> {
    return await this.model.findOneAndUpdate({ _id: id }, payload, {
      session: this.session || undefined,
      new: true,
    });
  }

  protected async baseUpdateOneByNewId(
    newId: string,
    payload: Partial<MetaData["entity"]>,
  ): Promise<void> {
    await this.model.findOneAndUpdate({ newId }, payload, {
      session: this.session || undefined,
    });
  }

  protected async baseUpdateManyByNewIds(
    newIds: string[],
    payload: Partial<MetaData["entity"]>,
  ): Promise<void> {
    await this.model.updateMany({ newId: { $in: newIds } }, payload, {
      session: this.session || undefined,
    });
  }

  protected async baseUpdateManyByIds(
    ids: ID[],
    payload: Partial<MetaData["entity"]>,
  ): Promise<void> {
    await this.model.updateMany({ _id: { $in: ids } }, payload, {
      session: this.session || undefined,
    });
  }

  protected async findManyWithPagination<
    FieldsToPopulate extends keyof MetaData["populatedFields"] = never,
  >(
    queryObject: FilterQuery<MetaData["entity"]>,
    options?: {
      populate?: FieldsToPopulate[];
      advancePopulate?: PopulateOptions & { isDeleted?: boolean | { $exists: boolean } };
      limit?: number;
      page?: number;
      sort?: Partial<Record<keyof MetaData["entity"], 1 | -1>>;
    },
  ): Promise<ResponseWithPagination<Populate<MetaData, FieldsToPopulate>>> {
    const defaultProjection = { password: 0, passwordChangedAt: 0 };
    const query = this.model.find(queryObject, defaultProjection);

    if (this.session) query.session(this.session);

    if (options?.populate) query.populate(options.populate as string[]);

    if (options?.sort) {
      query.sort(options.sort as { [key: string]: SortOrder });
    } else {
      query.sort({ createdAt: -1, _id: -1 });
    }

    if (options?.advancePopulate) {
      if (options.advancePopulate.isDeleted) {
        query.populate({
          ...options.advancePopulate,
          match: { isDeleted: options.advancePopulate.isDeleted },
        });
      } else {
        query.populate(options.advancePopulate);
      }
    }

    if (options?.limit !== undefined) query.limit(options.limit);

    if (options?.page !== undefined && options?.limit !== undefined)
      query.skip((options.page - 1) * options.limit);

    const totalDocsNumberPromise = this.model.count({
      ...queryObject,
    });

    const [docs, totalDocsNumber] = await Promise.all([query, totalDocsNumberPromise]);

    const totalPages = options?.limit ? Math.ceil(totalDocsNumber / options.limit) : null;
    const nextPage =
      totalPages && options?.page && options?.page + 1 <= totalPages ? options?.page + 1 : null;

    const response = {
      docs: docs as Populate<MetaData, FieldsToPopulate>[],
      meta: {
        limit: options?.limit || null,
        page: options?.page || null,
        totalDocs: totalDocsNumber,
        totalPages,
        hasNextPage: nextPage ? true : false,
        hasMore: nextPage ? true : false,
        nextPage,
        hasPrevPage: options?.page && options.page > 1 ? true : false,
        prevPage: options?.page && options.page > 1 ? options.page - 1 : null,
      },
    };

    return response;
  }

  protected async aggregateWithPagination<T>(
    pipeline: PipelineStage[],
    options: ListOptions,
  ): Promise<ResponseWithPagination<T>> {
    const query = this.model.aggregate(pipeline);

    if (this.session) query.session(this.session);

    if (options.page && options.limit) query.skip((options.page - 1) * options.limit);

    if (options.limit) query.limit(options.limit);

    const totalDocsNumberPromise = this.model.aggregate(pipeline).count("totalDocs");

    const [docs, totalDocsMeta] = await Promise.all([query, totalDocsNumberPromise]);

    const totalDocs = (totalDocsMeta[0]?.totalDocs || 0) as number;
    const totalPages = options.limit ? Math.ceil(totalDocs / options.limit) : null;
    const nextPage =
      totalPages && options.page && options.page + 1 <= totalPages ? options.page + 1 : null;

    const response = {
      docs: docs as T[],
      meta: {
        limit: options.limit || null,
        page: options.page || null,
        totalDocs,
        totalPages,
        hasNextPage: nextPage ? true : false,
        hasMore: nextPage ? true : false,
        nextPage,
        hasPrevPage: options.page && options.page > 1 ? true : false,
        prevPage: options.page && options.page > 1 ? options.page - 1 : null,
      },
    };

    return response;
  }

  async deleteOneById(id: ID): Promise<void> {
    await this.model.deleteOne({ _id: id }, { session: this.session || undefined });
  }

  async deleteManyByIds(ids: ID[]): Promise<void> {
    await this.model.deleteMany({ _id: { $in: ids } }, { session: this.session || undefined });
  }

  async deleteOneByNewId(newId: string): Promise<void> {
    await this.model.deleteOne({ newId: newId }, { session: this.session || undefined });
  }

  async deleteManyByNewIds(newIds: string[]): Promise<void> {
    await this.model.deleteMany({ newId: { $in: newIds } }, { session: this.session || undefined });
  }

  getRandomId(): ID {
    const mongoId = new ObjectId();
    return mongoId.toString() as ID;
  }
}
