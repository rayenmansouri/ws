import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";
import { UserMapper } from "../../users/mappers/User.mapper";
import { ClassRepo } from "../domain/Class.repo";
import { GetStudentsOfClassUseCase } from "./GetStudentsOfClass.usecase";

type GetStudentsCodeBarePdfUseCaseInput = {
  classNewId: string;
};

type GetStudentsCodeBarePdfUseCaseResponse = {
  students: UserProfileDTO[];
  schoolInformation: {
    className: string;
  };
};
@injectable()
export class GetStudentsCodeBarePdfUseCase {
  constructor(
    @inject("GetStudentsOfClassUseCase")
    private getStudentsOfClassUseCase: GetStudentsOfClassUseCase,
    @inject("ClassRepo") private classRepo: ClassRepo,
  ) {}

  async execute(
    params: GetStudentsCodeBarePdfUseCaseInput,
  ): Promise<GetStudentsCodeBarePdfUseCaseResponse> {
    const { classNewId } = params;

    const studentsInClass = await this.getStudentsOfClassUseCase.execute(classNewId);

    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "global.internalError");
    const students = studentsInClass.map(student =>
      UserMapper.toUserProfileDTO({
        ...student,
        phoneNumber: null,
        avatar: { link: student.avatar },
      }),
    );

    return {
      students,
      schoolInformation: { className: classDoc.name },
    };
  }
}
