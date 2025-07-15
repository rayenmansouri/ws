import { ID } from "../../../types/BaseEntity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SchoolRepo } from "../../schools/domain/School.repo";

@injectable()
export class GetSchoolAvailableTimeConstraintsUseCase {
  constructor(@inject("SchoolRepo") private readonly schoolRepo: SchoolRepo) {}

  async execute(schoolNewId: ID): Promise<{ day: number; hours: number[] }[]> {
    const school = await this.schoolRepo.findOneByIdOrThrow(schoolNewId, "notFound.school");

    return school.notAvailableTimes.map(constraint => {
      return {
        day: constraint.day,
        hours: constraint.hours,
      };
    });
  }
}
