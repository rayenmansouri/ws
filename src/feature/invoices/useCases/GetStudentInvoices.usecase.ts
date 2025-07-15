import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { InvoiceRepo } from "../../studentPayments/domain/Invoice.repo";
import { InvoiceService } from "../../studentPayments/domain/Invoice.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentInvoiceDto } from "../dtos/invoice.dto";
import { InvoiceMapper } from "../mappers/invoice.mapper";
import { ID } from "../../../types/BaseEntity";

type GetStudentInvoicesUseCaseData = {
  studentNewIds: string[];
  schoolYearIds?: ID[];
};

@injectable()
export class GetStudentInvoicesUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("InvoiceRepo") private invoiceRepo: InvoiceRepo,
  ) {}

  async execute(data: GetStudentInvoicesUseCaseData): Promise<StudentInvoiceDto> {
    const { studentNewIds } = data;
    const students = await this.studentRepo.findManyByNewIdsOrThrow(
      studentNewIds,
      "notFound.student",
      { populate: ["level"] },
    );

    const isMoreThanOneStudent = students.length > 1;
    const schoolYearIds = isMoreThanOneStudent
      ? students.map(student => student.level.currentSchoolYear._id)
      : data.schoolYearIds || null;

    const studentIds = students.map(student => student._id);

    const invoices = await this.invoiceRepo.findManyByStudents(studentIds, schoolYearIds);

    const oneTimeInvoices = InvoiceService.getOneTimeInvoices(invoices);
    const mainInvoices = InvoiceService.getMainInvoices(invoices);
    const oneTimeInvoicesDto = oneTimeInvoices.map(invoice =>
      //No need to populate parents because it not used in the frontend
      InvoiceMapper.toInvoiceDto({
        ...invoice,
        students: invoice.students.map(student => ({
          student: { ...student.student, parents: [] },
        })),
      }),
    );
    const mainInvoicesDto = mainInvoices.map(invoice =>
      //No need to populate parents because it not used in the frontend
      InvoiceMapper.toInvoiceDto({
        ...invoice,
        students: invoice.students.map(student => ({
          student: { ...student.student, parents: [] },
        })),
      }),
    );
    const studentInvoices = InvoiceMapper.toStudentInvoiceDto(oneTimeInvoicesDto, mainInvoicesDto);

    return studentInvoices;
  }
}
