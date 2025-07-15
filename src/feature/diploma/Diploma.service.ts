import { injectable } from "inversify";
import { inject } from "../../core/container/TypedContainer";
import { DiplomaRepo } from "./Diploma.repo";
import { Diploma } from "./diploma.entity";
import { BaseEntity } from "../../types/BaseEntity";
import { BadRequestError } from "../../core/ApplicationErrors";

type addDiplomaPayload = Omit<Diploma, keyof BaseEntity>;

@injectable()
export class DiplomaService {
  constructor(@inject("DiplomaRepo") private diplomaRepo: DiplomaRepo) {}

  async addDiploma(payload: addDiplomaPayload): Promise<Diploma> {
    const existingDiploma = await this.diplomaRepo.findOneByAverageBounds(
      payload.minAverage,
      payload.maxAverage,
    );

    if (existingDiploma) throw new BadRequestError("alreadyUsed.averageRange");

    await this.diplomaRepo.ensureFieldUniqueness("name", payload.name, "alreadyUsed.name");
    return this.diplomaRepo.addOne(payload);
  }

  async updateDiploma(diplomaNewId: string, payload: Partial<addDiplomaPayload>): Promise<Diploma> {
    const diploma = await this.diplomaRepo.findOneByNewIdOrThrow(diplomaNewId, "notFound.diploma");

    if (payload.name && payload.name !== diploma.name) {
      await this.diplomaRepo.ensureFieldUniqueness("name", payload.name, "alreadyUsed.name");
    }

    if (payload.minAverage || payload.maxAverage) {
      const newMaxAverage = payload.maxAverage || diploma.maxAverage;
      const newMinAverage = payload.minAverage || diploma.minAverage;
      const existingDiploma = await this.diplomaRepo.findOneByAverageBounds(
        newMinAverage,
        newMaxAverage,
      );
      if (existingDiploma && existingDiploma._id !== diploma._id) {
        throw new BadRequestError("alreadyUsed.averageRange");
      }
    }

    await this.diplomaRepo.updateOneById(diploma._id, payload);

    return { ...diploma, ...payload };
  }

  async deleteDiplomas(newIds: string[]): Promise<void> {
    const diplomas = await this.diplomaRepo.findManyByNewIdsOrThrow(newIds, "notFound.diploma");

    await this.diplomaRepo.deleteManyByIds(diplomas.map(diploma => diploma._id));
  }
}
