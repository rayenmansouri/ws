import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Populate } from "../../../core/populateTypes";
import { Signature, SignatureMetaData } from "../../../feature/signatures/domain/signature.entity";
import { SignatureRepo } from "../../../feature/signatures/domain/Signature.repo";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoSignatureRepo extends MongoBaseRepo<SignatureMetaData> implements SignatureRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "signature", session);
  }

  async list(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<SignatureMetaData, "classTypes">>> {
    const query: FilterQuery<SignatureMetaData> = {};
    if (filter.search) query.name = { $regex: filter.search, $options: "i" };

    return await this.findManyWithPagination(query, { ...options, populate: ["classTypes"] });
  }

  async findByClassType(classTypeId: ID): Promise<Signature | null> {
    return await this.model.findOne({ classTypes: { $in: [classTypeId] } });
  }
}
