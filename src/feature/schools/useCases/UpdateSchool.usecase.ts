import { injectable } from "inversify";
import { container } from "../../../core/container/container";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { schoolDocStore } from "../../../core/subdomainStore";
import { getNewTenantConnection } from "../../../database/connectionDB/tenantPoolConnection";
import { School, TEducationDepartmentEnum, TGradeReportThemEnum } from "../domain/school.entity";
import { SchoolRepo } from "../domain/School.repo";

type UpdateSchoolUseCaseRequest = Partial<{
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  directorName: string;
  dueDate: number;
  taxRate: number;
  maxStudentSeats: number;
  gradeBookTheme: TGradeReportThemEnum;
  enableSms: boolean;
  enableEmail: boolean;
  educationDepartment: TEducationDepartmentEnum;
  cover: FileUploadPayload;
  logo: FileUploadPayload;
  financeSignature: FileUploadPayload;
  academicSignature: FileUploadPayload;
  constraints: {
    day: number;
    hours: number[];
    isAvailable: boolean;
  }[];
  schedule: {
    startHour: number | undefined;
    endHour: number | undefined;
    days: number[] | undefined;
    step: number | undefined;
  };
}>;

@injectable()
export class UpdateSchoolUseCase {
  constructor(
    @inject("SchoolRepo") private schoolRepo: SchoolRepo,
    @inject("FileManager") private fileManger: FileManager,
  ) {}

  async execute(schoolNewId: string, dto: UpdateSchoolUseCaseRequest): Promise<void> {
    const school = await this.schoolRepo.findOneByNewIdOrThrow(schoolNewId, "notFound.school");

    if (dto.name && dto.name !== school.name)
      await this.schoolRepo.ensureFieldUniqueness("name", dto.name, "alreadyUsed.name");

    let coverUrl = school.cover;
    let logoUrl = school.logo;
    let financeSignature = school.financeSignature;
    let academicSignature = school.academicSignature;
    if (dto.cover) {
      const uploadedCover = await this.fileManger.uploadFile(dto.cover, "schools/cover");
      coverUrl = uploadedCover.link;
    }

    if (dto.logo) {
      const uploadedLogo = await this.fileManger.uploadFile(dto.logo, "schools/logo");
      logoUrl = uploadedLogo.link;
    }

    if (dto.financeSignature) {
      const uploadedSignature = await this.fileManger.uploadFile(
        dto.financeSignature,
        "schools/signature",
      );
      financeSignature = {
        name: uploadedSignature.name,
        url: uploadedSignature.link,
        public_id: uploadedSignature.path,
        date: uploadedSignature.uploadedAt,
        size: uploadedSignature.size,
        mimeType: uploadedSignature.mimeType,
      };
    }

    if (dto.academicSignature) {
      const uploadedSignature = await this.fileManger.uploadFile(
        dto.academicSignature,
        "schools/signature",
      );
      academicSignature = {
        name: uploadedSignature.name,
        url: uploadedSignature.link,
        public_id: uploadedSignature.path,
        date: uploadedSignature.uploadedAt,
        size: uploadedSignature.size,
        mimeType: uploadedSignature.mimeType,
      };
    }

    const schoolPayload: Partial<School> = {
      ...dto,
      cover: coverUrl,
      logo: logoUrl,
      financeSignature,
      academicSignature,
      schedule: {
        startHour: dto.schedule?.startHour ?? school.schedule.startHour,
        endHour: dto.schedule?.endHour ?? school.schedule.endHour,
        days: (dto.schedule?.days || school.schedule.days).sort((a, b) => a - b),
        step: dto.schedule?.step ?? school.schedule.step,
      },
    };

    if (dto.schedule?.step !== undefined && dto.schedule.step !== school.schedule.step) {
      const connection = await getNewTenantConnection(school.subdomain);
      const childContainer = container.createChild();
      childContainer.bind("Connection").toConstantValue(connection);

      const teacherRepo = childContainer.get("TeacherRepo");
      const classRepo = childContainer.get("ClassRepo");

      schoolPayload.notAvailableTimes = [];

      await teacherRepo.resetNotAvailableTimesForAllTeachers();

      await classRepo.resetNotAvailableTimesForAllClasses();
    }

    await this.schoolRepo.updateOneById(school._id, {
      ...schoolPayload,
    });

    schoolDocStore[school._id] = {
      ...school,
      ...schoolPayload,
    };
  }
}
