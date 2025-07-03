import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  PRE_REGISTRATION_STATUES_ENUM,
  PreRegistration,
  PreRegistrationMetaData,
} from "../../../feature/preRegistration/domains/preRegistration.entity";
import { PreRegistrationRepo } from "../../../feature/preRegistration/domains/PreRegistration.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { Populate } from "../../../core/populateTypes";

export class MongoPreRegistrationRepo
  extends MongoBaseRepo<PreRegistrationMetaData>
  implements PreRegistrationRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "preRegistration", session);
  }

  async findManyByLevel(levelId: ID): Promise<PreRegistrationMetaData["entity"][]> {
    return this.model.find({ level: levelId }).lean();
  }

  async findManyByClassType(classTypeId: ID): Promise<PreRegistrationMetaData["entity"][]> {
    return this.model.find({ classType: classTypeId }).lean();
  }

  async listPreRegistrations(
    filter: { search?: string; level?: ID; status?: string; isRegistered?: boolean },
    options?: ListOptions,
  ): Promise<ResponseWithPagination<Populate<PreRegistrationMetaData, "level" | "classType">>> {
    const filterQuery: FilterQuery<PreRegistration> = {};

    if (filter.search)
      filterQuery.$or = [
        { parentFullName: { $regex: filter.search, $options: "i" } },
        { parentPhoneNumber: { $regex: filter.search, $options: "i" } },
      ];

    if (filter.level) filterQuery.level = filter.level;

    if (filter.status) filterQuery.status = filter.status;

    if (filter.isRegistered !== undefined) filterQuery.isRegister = filter.isRegistered;

    const data = await this.findManyWithPagination(filterQuery, {
      ...options,
      populate: ["classType", "level"],
    });

    return data;
  }

  async addEmptyOne(): Promise<PreRegistrationMetaData["entity"]> {
    const preRegistration = await this.addOne({
      status: PRE_REGISTRATION_STATUES_ENUM.PENDING,
      parentFirstName: null,
      parentLastName: null,
      parentEmail: null,
      parentPhoneNumber: null,
      preferredLanguage: null,
      parentAddress: null,
      job: null,
      parentFullName: null,
      isRegister: false,
      studentFullName: null,
      studentFirstName: null,
      studentLastName: null,
      studentEmail: null,
      studentPhoneNumber: null,
      studentBirthDate: null,
      studentAddress: null,
      studentGender: null,
      nationality: null,
      spokenLanguages: null,
      level: null,
      classType: null,
      previousSchoolInfo: null,
      birthCertificate: [],
      previousTranscripts: [],
      communicationType: null,
      studentEnrollmentReason: null,
      otherComment: null,
    });

    return preRegistration;
  }
}
