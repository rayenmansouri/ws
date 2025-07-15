import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../../students/domain/Student.repo";
import { ParentRepo } from "../../parents/domain/Parent.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { InvoiceMapper } from "../mappers/invoice.mapper";
import { InvoiceSearchDto } from "../dtos/invoice.dto";

export type getSearchInvoicesUseCaseRequestDto = {
  search: string;
};
@injectable()
export class GetSearchInvoicesUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("ParentRepo") private parentRepo: ParentRepo,
  ) {}

  async execute(dto: getSearchInvoicesUseCaseRequestDto): Promise<InvoiceSearchDto[]> {
    const limit = 5;
    const students = await this.studentRepo.find({ search: dto.search }, { limit });
    const classDocs = await this.classRepo.find({ search: dto.search }, { limit });
    const parents = await this.parentRepo.findManyByFullName(dto.search, { limit });

    const studentSearchDto = students.map(student =>
      InvoiceMapper.toInvoiceSearchDto({ students: student, classDocs: null, parents: null }),
    );
    const classSearchDto = classDocs.map(classDoc =>
      InvoiceMapper.toInvoiceSearchDto({ students: null, classDocs: classDoc, parents: null }),
    );
    const parentSearchDto = parents.map(parent =>
      InvoiceMapper.toInvoiceSearchDto({ students: null, classDocs: null, parents: parent }),
    );

    return [...studentSearchDto, ...classSearchDto, ...parentSearchDto];
  }
}
