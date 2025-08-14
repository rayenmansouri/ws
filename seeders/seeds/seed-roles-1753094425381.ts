import { END_USER_ENUM } from "../../src/constants/globalEnums";
import { ISeeder } from "../interface";
import { UserTypeEnum } from "../../src/feature/user-management/factory/enums";
import { ACTION_ENUM, RESOURCES_ENUM } from "../../src/constants/ActionsResource";
import { RoleModel } from "../../src/feature/roles/role.schema";
import { SUPER_ADMIN_ROLE } from "../../src/feature/roles/constant";
import { RoleService } from "../../src/core/express/middlewares/authorize";

export default class SeedRoles implements ISeeder {
    roles = [
        {
          name: SUPER_ADMIN_ROLE,
          userTypes: [END_USER_ENUM.MASTER],
          description: "Super Admin Role",
          permissions: [
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.USER),
          ],
          translation: {
            ar: "المدير العام",
            en: "Super Admin",
            fr: "Super Admin",
          },
        }, 
        {
          name: UserTypeEnum.ADMIN,
          permissions: [
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.USER),
            // Admin Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.ADMIN),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.ADMIN),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.ADMIN),
            RoleService.formatPermission(ACTION_ENUM.ARCHIVE, RESOURCES_ENUM.ADMIN),
            RoleService.formatPermission(ACTION_ENUM.UNARCHIVE, RESOURCES_ENUM.ADMIN),
            // Role Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.ROLE),
            // Student Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.ASSIGN, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.UNASSIGN, RESOURCES_ENUM.STUDENT),
            // Teacher Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.ASSIGN, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.UNASSIGN, RESOURCES_ENUM.TEACHER),
            // Parent Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.PARENT),
            // Class Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.CLASS),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.CLASSROOM),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.CLASS_TYPE),
            // Group Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.GROUP),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.GROUP),
            RoleService.formatPermission(ACTION_ENUM.DELETE, RESOURCES_ENUM.GROUP),
            // Level Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.LEVEL),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.LEVEL),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SECTION),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SUB_LEVEL),
            // Term Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.TERM),
            // Subject Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SUBJECT),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SUB_SUBJECT),
            // Session Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SESSION),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SESSION_TYPE),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.SESSION_TYPE),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.SESSION_TYPE),
            RoleService.formatPermission(ACTION_ENUM.DELETE, RESOURCES_ENUM.SESSION_TYPE),
            // Schedule Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SCHEDULE),
            // Exam Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.EXAM_TYPE),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.EXAM_GRADE),
            // Homework Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.HOMEWORK),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.HOMEWORK),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.HOMEWORK),
            RoleService.formatPermission(ACTION_ENUM.DELETE, RESOURCES_ENUM.HOMEWORK),
            // Observation Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.OBSERVATION),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.OBSERVATION_REASON),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.OBSERVATION_REASON),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.OBSERVATION_REASON),
            RoleService.formatPermission(ACTION_ENUM.DELETE, RESOURCES_ENUM.OBSERVATION_REASON),
            // Holiday Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.HOLIDAY),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.HOLIDAY),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.HOLIDAY),
            RoleService.formatPermission(ACTION_ENUM.DELETE, RESOURCES_ENUM.HOLIDAY),
            // Financial Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.INVOICE),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.TRANSACTION),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.BANK_CHECK),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.BANK_TRANSFER),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.PAYMENT_CONFIGURATION),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.PAYMENT_TEMPLATE),
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.PAYMENT_TEMPLATE),
            RoleService.formatPermission(ACTION_ENUM.EDIT, RESOURCES_ENUM.PAYMENT_TEMPLATE),
            RoleService.formatPermission(ACTION_ENUM.DELETE, RESOURCES_ENUM.PAYMENT_TEMPLATE),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.EXPENSE),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.TEACHER_PAYMENT),
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.TEACHER_PAYMENT_CONFIGURATION),
            // Service Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SERVICE),
            // Issue Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.ISSUE),
            // Smart Calendar
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SMART_CALENDAR),
            // Announcement Management
            RoleService.formatPermission(ACTION_ENUM.ADD, RESOURCES_ENUM.ANNOUNCEMENT),
            // Notification Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.NOTIFICATION),
            // Alert Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.ALERT),
            // LMS Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.LMS),
            // Signature Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SIGNATURE),
            // Tutorial Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.TUTORIAL),
            // Pre-registration
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.PRE_REGISTRATION),
            // School Year
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SCHOOL_YEAR),
            // Diploma
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.DIPLOMA),
            // Supplier
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SUPPLIER),
            // SMS History
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SMS_HISTORY),
            // App Version
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.APP_VERSION),
            // Flags
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.FLAGS),
            // Master
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.MASTER),
            // School
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.SCHOOL),
            // Password Management
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.PASSWORD),
            // Group Type
            RoleService.formatPermission(ACTION_ENUM.VIEW, RESOURCES_ENUM.GROUP_TYPE),
            // Export functionality
            RoleService.formatPermission(ACTION_ENUM.EXPORT, RESOURCES_ENUM.STUDENT),
            RoleService.formatPermission(ACTION_ENUM.EXPORT, RESOURCES_ENUM.TEACHER),
            RoleService.formatPermission(ACTION_ENUM.EXPORT, RESOURCES_ENUM.CLASS),
            RoleService.formatPermission(ACTION_ENUM.EXPORT, RESOURCES_ENUM.GROUP),
            // Switch functionality
            RoleService.formatPermission(ACTION_ENUM.SWITCH, RESOURCES_ENUM.STUDENT),
            // Pay functionality
            RoleService.formatPermission(ACTION_ENUM.PAY, RESOURCES_ENUM.TEACHER_PAYMENT),
            RoleService.formatPermission(ACTION_ENUM.UNPAY, RESOURCES_ENUM.TEACHER_PAYMENT),
          ],
          userTypes: [END_USER_ENUM.ADMIN],
          description: "Admin Role",
          translation: {
            ar: "المدير",
            en: "Admin",
          },
        },
        {
          name: UserTypeEnum.COACH,
          userTypes: [END_USER_ENUM.COACH],
          description: "Coach Role",
          translation: {
            ar: "المدرب",
            en: "Coach",
          },
        },
        {
          name: UserTypeEnum.PARTICIPANT,
          userTypes: [END_USER_ENUM.PARTICIPANT],
          description: "Participant Role",
          translation: {
            ar: "المشارك",
            en: "Participant",
          },
        }
    ]
    
    async seed(): Promise<void> {
        console.log("seeding roles")
        await RoleModel.insertMany(this.roles);
    }  
    
     async preSeed(): Promise<void> {
        console.log("removing all roles from database");
        await RoleModel.deleteMany({});
    }
}
