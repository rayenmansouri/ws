import { injectable, unmanaged } from "inversify";
import { CounterRepo } from "../feature/counter/counter.repo";
import { TranslationPaths } from "../translation/translationKeys";
import { RemoveNull } from "../types/utils";
import { BaseEntity } from "./../shared/domain/baseEntity";
import { EntityMetaData } from "./../shared/domain/EntityMetadata.type";
import { ID } from "./../shared/value-objects/ID.vo";
import { BadRequestError, NotFoundError } from "./ApplicationErrors";
import { Populate } from "./populateTypes";

@injectable()
export abstract class BaseRepo<MetaData extends EntityMetaData<BaseEntity>> {
  constructor(@unmanaged() private counterRepo: CounterRepo) {}

  abstract findOneByNewId<
    FieldsToPopulate extends keyof MetaData["populatedFields"] = never
  >(
    newId: string,
    options?: {
      populate?: FieldsToPopulate[];
    }
  ): Promise<Populate<MetaData, FieldsToPopulate> | null>;

  async findOneByNewIdOrThrow<
    FieldsToPopulate extends keyof MetaData["populatedFields"] = never
  >(
    newId: string,
    message: TranslationPaths,
    options?: {
      populate?: FieldsToPopulate[];
    }
  ): Promise<Populate<MetaData, FieldsToPopulate>> {
    const entity = await this.findOneByNewId(newId, options);

    if (!entity) throw new NotFoundError(message);

    return entity;
  }

  abstract findOneById<
    FieldsToPopulate extends keyof MetaData["populatedFields"] = never
  >(
    id: ID,
    options?: {
      populate?: FieldsToPopulate[];
    }
  ): Promise<Populate<MetaData, FieldsToPopulate> | null>;

  async findOneByIdOrThrow<
    FieldsToPopulate extends keyof MetaData["populatedFields"] = never
  >(
    id: ID,
    message: TranslationPaths,
    options?: {
      populate?: FieldsToPopulate[];
    }
  ): Promise<Populate<MetaData, FieldsToPopulate>> {
    const entity = await this.findOneById(id, options);

    if (!entity) throw new NotFoundError(message);

    return entity;
  }

  abstract findManyByNewIds<
    FieldsToPopulate extends keyof MetaData["populatedFields"] = never
  >(
    newIds: string[],
    options?: {
      populate?: FieldsToPopulate[];
    }
  ): Promise<Populate<MetaData, FieldsToPopulate>[]>;

  async findManyByNewIdsOrThrow<
    FieldsToPopulate extends keyof MetaData["populatedFields"] = never
  >(
    newIds: string[],
    message: TranslationPaths,
    options?: {
      populate?: FieldsToPopulate[];
    }
  ): Promise<Populate<MetaData, FieldsToPopulate>[]> {
    const entities = await this.findManyByNewIds(newIds, options);

    if (entities.length !== newIds.length) throw new NotFoundError(message);

    return entities;
  }

  abstract findManyByIds<
    FieldsToPopulate extends keyof MetaData["populatedFields"] = never
  >(
    ids: ID[],
    options?: {
      populate?: FieldsToPopulate[];
    }
  ): Promise<Populate<MetaData, FieldsToPopulate>[]>;

  async findManyByIdsOrThrow<
    FieldsToPopulate extends keyof MetaData["populatedFields"] = never
  >(
    ids: ID[],
    message: TranslationPaths,
    options?: { populate?: FieldsToPopulate[] }
  ): Promise<Populate<MetaData, FieldsToPopulate>[]> {
    const entities = await this.findManyByIds(ids, options);

    if (entities.length !== ids.length) throw new NotFoundError(message);

    return entities;
  }

  abstract findAll<
    FieldsToPopulate extends keyof MetaData["populatedFields"] = never
  >(options?: {
    populate?: FieldsToPopulate[];
  }): Promise<Populate<MetaData, FieldsToPopulate>[]>;

  protected abstract baseAddOne(
    payload: MetaData["entity"]
  ): Promise<MetaData["entity"]>;

  async addOne(
    payload: Omit<MetaData["entity"], keyof BaseEntity>
  ): Promise<MetaData["entity"]> {
    const newId = await this.counterRepo.incrementAndGet();

    const currentTime = new Date();

    const baseEntity: Omit<BaseEntity, "id"> = {
      newId: this.counterRepo.formatNewId(newId),
      updatedAt: currentTime,
      createdAt: currentTime,
    };

    const entity = await this.baseAddOne({
      ...payload,
      ...baseEntity,
    } as MetaData["entity"]);

    return entity;
  }

  protected abstract baseAddMany(payload: MetaData["entity"][]): Promise<void>;

  async addMany(
    payload: Omit<MetaData["entity"], keyof BaseEntity>[]
  ): Promise<void> {
    const currentTime = new Date();

    const currentCount = await this.counterRepo.getCurrentCount();

    const baseEntities: Omit<BaseEntity, "id" | "newId"> = {
      updatedAt: currentTime,
      createdAt: currentTime,
    };

    await this.baseAddMany(
      payload.map(
        (entity, index) =>
          ({
            ...entity,
            ...baseEntities,
            newId: this.counterRepo.formatNewId(currentCount + index + 1),
          } as MetaData["entity"])
      )
    );

    await this.counterRepo.incrementByValue(payload.length);
  }

  protected abstract baseUpdateOneById(
    id: ID,
    payload: Partial<MetaData["entity"]>
  ): Promise<MetaData["entity"] | null>;

  async updateOneById(
    id: ID,
    payload: Partial<MetaData["entity"]>
  ): Promise<MetaData["entity"] | null> {
    return await this.baseUpdateOneById(id, {
      ...payload,
      updatedAt: new Date(),
    });
  }

  protected abstract baseUpdateOneByNewId(
    newId: string,
    payload: Partial<MetaData["entity"]>
  ): Promise<void>;

  async updateOneByNewId(
    newId: string,
    payload: Partial<MetaData["entity"]>
  ): Promise<void> {
    await this.baseUpdateOneByNewId(newId, {
      ...payload,
      updatedAt: new Date(),
    });
  }

  protected abstract baseUpdateManyByNewIds(
    newId: string[],
    payload: Partial<MetaData["entity"]>
  ): Promise<void>;

  async updateManyByNewId(
    newId: string[],
    payload: Partial<MetaData["entity"]>
  ): Promise<void> {
    await this.baseUpdateManyByNewIds(newId, {
      ...payload,
      updatedAt: new Date(),
    });
  }

  protected abstract baseUpdateManyByIds(
    ids: ID[],
    payload: Partial<MetaData["entity"]>
  ): Promise<void>;

  async updateManyByIds(
    ids: ID[],
    payload: Partial<MetaData["entity"]>
  ): Promise<void> {
    await this.baseUpdateManyByIds(ids, { ...payload, updatedAt: new Date() });
  }

  protected abstract findOneByField<T extends keyof MetaData["entity"]>(
    field: T,
    value: MetaData["entity"][T]
  ): Promise<MetaData["entity"] | null>;

  async ensureFieldUniqueness<T extends keyof MetaData["entity"]>(
    field: T,
    value: RemoveNull<MetaData["entity"][T]>,
    message: TranslationPaths
  ): Promise<void> {
    const entity = await this.findOneByField(field, value);

    if (entity) throw new BadRequestError(message);
  }

  abstract deleteOneById(id: ID): Promise<void>;

  abstract deleteManyByIds(ids: ID[]): Promise<void>;

  abstract deleteOneByNewId(newId: ID): Promise<void>;

  abstract deleteManyByNewIds(newIds: ID[]): Promise<void>;
}
