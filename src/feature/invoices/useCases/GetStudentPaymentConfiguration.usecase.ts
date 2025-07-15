import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { StudentPaymentConfigurationRepo } from "../../studentPayments/domain/StudentPaymentConfiguration.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentPaymentConfigurationDto } from "../dtos/studentPaymentConfiguration.dto";
import { StudentPaymentConfigurationMapper } from "../mappers/studentPaymentConfiguration.mapper";

type GetStudentPaymentConfigurationParams = {
  studentNewId: string;
};

@injectable()
export class GetStudentPaymentConfigurationUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentPaymentConfigurationRepo")
    private studentPaymentConfigurationRepo: StudentPaymentConfigurationRepo,
  ) {}

  async execute(
    params: GetStudentPaymentConfigurationParams,
  ): Promise<StudentPaymentConfigurationDto> {
    const { studentNewId } = params;

    const student = await this.studentRepo.findUnarchiveStudentByNewIdOrThrow(studentNewId, {
      populate: ["level"],
    });

    const studentPaymentConfiguration =
      await this.studentPaymentConfigurationRepo.getOneByStudentOrThrow(student._id);

    return StudentPaymentConfigurationMapper.toStudentPaymentConfigurationDto(
      studentPaymentConfiguration,
    );
  }
}
