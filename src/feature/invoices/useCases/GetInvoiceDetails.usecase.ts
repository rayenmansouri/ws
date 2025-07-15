import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { InvoiceDetailsDto } from "../dtos/invoice.dto";
import { InvoiceMapper } from "../mappers/invoice.mapper";
import { School } from "../../schools/domain/school.entity";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentService } from "../../students/domain/Student.service";

@injectable()
export class GetInvoiceDetailsUseCase {
  constructor(
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("School") private school: School,
  ) {}

  async execute(invoiceNewId: string, parentId?: ID): Promise<InvoiceDetailsDto> {
    const invoice = await this.invoiceRepo.findOneByNewIdOrThrow(invoiceNewId, "notFound.invoice", {
      populate: ["mergedInvoices"],
    });
    const studentIds = invoice.students.map(student => student.student);

    const students = await this.studentRepo.findManyByIds(studentIds, { populate: ["parents"] });

    StudentService.ensureParentPermission(students, parentId);

    return InvoiceMapper.toInvoiceDetailsDto({
      invoice,
      students,
      school: this.school,
    });
  }
}
