import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { addSchoolToGlobalStore } from "../../../core/subdomainStore";
import {
  getNewTenantConnection,
  getTenantCon,
} from "../../../database/connectionDB/tenantPoolConnection";
import {
  applySchoolConfig,
  getSchoolConfig,
  validateSchoolConfig,
} from "../../../features/schools/services/master/schoolConfig.service";
import { FEATURE_FLAGS_ENUM } from "../constants/featureFlags";
import {
  TEducationDepartmentEnum,
  TGradeReportThemEnum,
  TInstanceTypeEnum,
} from "../domain/school.entity";
import { SchoolRepo } from "../domain/School.repo";
import { container } from "../../../core/container/container";

export const DEFAULT_SCHOOL_COVER =
  "https://www.dropbox.com/scl/fi/g5546zpfg8henqyubvknc/school_cover.jpg?rlkey=dshwm08ga8uyjhwr1p8c41x8u&st=53g103mq&dl=0&raw=1";

type AddSchoolUseCaseRequest = {
  name: string;
  subdomain: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  directorName?: string;
  configName?: string;
  dueDate: number;
  taxRate: number;
  maxStudentSeats: number;
  gradeBookTheme: TGradeReportThemEnum;
  enableSms: boolean;
  enableEmail: boolean;
  educationDepartment: TEducationDepartmentEnum;
  instanceType: TInstanceTypeEnum;
};

@injectable()
export class AddSchoolUseCase {
  constructor(@inject("SchoolRepo") private schoolRepo: SchoolRepo) {}

  async execute(payload: AddSchoolUseCaseRequest): Promise<void> {
    await this.schoolRepo.ensureFieldUniqueness("name", payload.name, "alreadyUsed.name");
    await this.schoolRepo.ensureFieldUniqueness(
      "subdomain",
      payload.subdomain,
      "alreadyUsed.subdomain",
    );

    const school = await this.schoolRepo.addOne({
      name: payload.name,
      subdomain: payload.subdomain,
      email: payload.email || null,
      phoneNumber: payload.phoneNumber || null,
      address: payload.address || null,
      directorName: payload.directorName || null,
      dueDate: payload.dueDate,
      taxRate: payload.taxRate,
      logo: null,
      maxStudentSeats: payload.maxStudentSeats,
      educationDepartment: payload.educationDepartment,
      enableSms: payload.enableSms,
      enableEmail: payload.enableEmail,
      instanceType: payload.instanceType,
      gradeBookTheme: payload.gradeBookTheme,
      cover: DEFAULT_SCHOOL_COVER,
      currency: "TND",
      forceCloseSessionDelayInMin: 30,
      openSessionAdvanceInMin: 30,
      openSessionDelayInMin: 30,
      timeZone: "Africa/Tunis",
      featureFlags: {
        [FEATURE_FLAGS_ENUM.MESSAGES]: true,
        [FEATURE_FLAGS_ENUM.ANNOUNCEMENTS]: true,
        [FEATURE_FLAGS_ENUM.SMART_CALENDAR]: true,
        [FEATURE_FLAGS_ENUM.TUTORIALS]: true,
        [FEATURE_FLAGS_ENUM.DARK_MODE]: false,
        [FEATURE_FLAGS_ENUM.LMS]: false,
      },
      signature: null,
      financeSignature: null,
      academicSignature: null,
      schedule: {
        startHour: 8,
        endHour: 18,
        days: [1, 2, 3, 4, 5, 6],
        step: 1,
      },
      totalSmsSold: 0,
      notAvailableTimes: [],
    });

    addSchoolToGlobalStore(school);

    if (!payload.configName) return;

    const schoolConfig = await getSchoolConfig(payload.configName);
    validateSchoolConfig(schoolConfig);

    const connection = await getTenantCon(school.subdomain);
    await applySchoolConfig(connection, schoolConfig);

    const newConnection = await getNewTenantConnection(school.subdomain);
    const childContainer = container.createChild();
    childContainer.bind("Connection").toConstantValue(newConnection);

    const gradeReportTemplate = childContainer.get("GradeReportTemplateRepo");
    await gradeReportTemplate.addOne({
      name: "Main",
      classTypes: [],
      subjectTypes: [],
      isBuiltIn: true,
      isDefault: true,
    });
  }
}
