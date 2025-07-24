import { FileMapper } from "../../../core/fileManager/file.mapper";
import { School } from "../domain/school.entity";
import { SchoolDTO } from "../dtos/School.dto";

export class SchoolMapper {
  static toSchoolDTO(school: School): SchoolDTO {
    return {
      _id: school._id,
      newId: school.newId,
      name: school.name,
      subdomain: school.subdomain,
      phoneNumber: school.phoneNumber,
      email: school.email,
      address: school.address,
      logo: school.logo,
      dueDate: school.dueDate,
      taxRate: school.taxRate,
      maxStudentSeats: school.maxStudentSeats,
      educationDepartment: school.educationDepartment,
      enableSms: school.enableSms,
      enableEmail: school.enableEmail,
      instanceType: school.instanceType,
      gradeBookTheme: school.gradeBookTheme,
      featureFlags: school.featureFlags,
      financeSignature: school.financeSignature
        ? FileMapper.toFileDTO(school.financeSignature)
        : null,
      academicSignature: school.academicSignature
        ? FileMapper.toFileDTO(school.academicSignature)
        : null,
      schedule: {
        startHour: school.schedule.startHour,
        endHour: school.schedule.endHour,
        days: school.schedule.days,
        step: school.schedule.step.toString(),
      },
      directorName: school.directorName,
      totalSmsSold: school.totalSmsSold,
    };
  }
}
