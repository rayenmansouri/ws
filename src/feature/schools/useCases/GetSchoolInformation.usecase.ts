import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { School } from "../domain/school.entity";
import { SchoolMapper } from "../mappers/School.mapper";
import { SchoolDTO } from "../dtos/School.dto";

@injectable()
export class GetSchoolDetailsUseCase {
  constructor(@inject("School") private school: School) {}

  execute(): SchoolDTO {
    return SchoolMapper.toSchoolDTO(this.school);
  }
}
