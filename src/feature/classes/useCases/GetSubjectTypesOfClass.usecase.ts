import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { EntityDto } from "../../entity/dto/entity.dto";
import { EntityMapper } from "../../entity/mapper/entity.mapper";
import { SubjectTypeRepo } from "../../subjectTypes/domains/SubjectType.repo";
import { ClassRepo } from "../domain/Class.repo";

@injectable()
export class GetSubjectTypesOfClassUseCase {
  constructor(
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo,
  ) {}

  async execute(classId: ID): Promise<EntityDto[]> {
    const classDoc = await this.classRepo.findOneByIdOrThrow(classId, "notFound.class");
    const subjectTypeIds = Object.keys(classDoc.subjectTeacherMap) as ID[];

    const subjectTypes = await this.subjectTypeRepo.findManyByIds(subjectTypeIds);

    const subjectTypeDtos = subjectTypes.map(EntityMapper.toEntityDto);
    return subjectTypeDtos;
  }
}
