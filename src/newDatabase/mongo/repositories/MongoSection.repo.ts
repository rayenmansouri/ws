import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Section, SectionMetaData } from "../../../feature/sections/domain/section.entity";
import { SectionRepo } from "../../../feature/sections/repos/Section.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { Populate } from "../../../core/populateTypes";

export class MongoSectionRepo extends MongoBaseRepo<SectionMetaData> implements SectionRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "section", session);
  }

  async findManyBySubLevel(subLevelId: string): Promise<Section[]> {
    return this.model.find({ subLevel: subLevelId }).lean();
  }

  async listSections<FieldsToPopulate extends keyof SectionMetaData["populatedFields"] = never>(
    filter: { search?: string },
    options: ListOptions & { populate?: FieldsToPopulate[] },
  ): Promise<ResponseWithPagination<Populate<SectionMetaData, FieldsToPopulate>>> {
    const filterQuery: FilterQuery<Section> = {};
    if (filter.search) filterQuery.name = { $regex: filter.search, $options: "i" };

    return this.findManyWithPagination(filterQuery, { ...options, populate: options.populate });
  }
}
