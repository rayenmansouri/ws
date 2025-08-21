import { BaseController } from "../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../core/express/types";
import { APIResponse } from "../../../core/responseAPI/APIResponse";
import { ListStudentRouteConfig, ListStudentResponse, StudentResponse } from "./list-student.types";
import { SuccessResponse } from "../../../core/responseAPI/APISuccessResponse";
import { inject } from "../../../core/container/TypedContainer";
import { Injectable } from "../../../core/container/decorators/AutoRegister.decorator";
import { REPOSITORY_FACTORY_IDENTIFIER } from "../../../feature/user-management/constants";
import { UserFactory } from "../../../feature/user-management/factory/abstract-factory";
import { UserTypeEnum } from "../../../feature/user-management/factory/enums";
import { paginateResult } from "../../../helpers/paginateResult";

@Injectable({
  identifier: "ListStudentController",
})
export class ListStudentController extends BaseController<ListStudentRouteConfig> {
  constructor(
    @inject(REPOSITORY_FACTORY_IDENTIFIER) private repositoryFactory: UserFactory,
  ) {
    super();
  }

  async main(req: TypedRequest<ListStudentRouteConfig>): Promise<void | APIResponse> {
    const { search, page = 1, limit = 10, type, status } = req.query;
    
    // Get the appropriate repository based on type
    const userType = type ? (type as UserTypeEnum) : UserTypeEnum.PARTICIPANT;
    const userRepository = this.repositoryFactory.getRepository(userType);
    
    // Build query filters
    const filters: Record<string, unknown> = {};
    
    if (search) {
      filters.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) {
      filters.status = status;
    }
    
    // Get all students first, then paginate
    const count = await userRepository.count(filters);
    const allStudents = await userRepository.findAllWithPagination(filters, page, limit);
    
    // Apply pagination
    const paginatedResult = paginateResult(allStudents, limit, page, count);
    
    // Transform the response to match our schema
    const transformedStudents: StudentResponse[] = paginatedResult.docs.map((student) => {
      const studentData = student as unknown as Record<string, unknown>;
      return {
        id: String(studentData.id ?? studentData._id ?? ''),
        firstName: String(studentData.firstName ?? ''),
        lastName: String(studentData.lastName ?? ''),
        fullName: String(studentData.fullName ?? ''),
        email: String(studentData.email ?? ''),
        phoneNumber: studentData.phoneNumber !== undefined && studentData.phoneNumber !== null ? String(studentData.phoneNumber) : undefined,
        type: String(studentData.type ?? ''),
        status: String(studentData.status ?? 'active'),
        createdAt: studentData.createdAt as Date ?? new Date(),
        updatedAt: studentData.updatedAt as Date ?? new Date(),
      };
    });
    
    const response: ListStudentResponse = {
      data: transformedStudents,
      docs: transformedStudents,
      meta: {
        page: paginatedResult.meta.page,
        limit: paginatedResult.meta.limit,
        total: paginatedResult.meta.total,
        totalPages: paginatedResult.meta.totalPages,
        totalDocs: paginatedResult.meta.totalDocs,
        hasNextPage: paginatedResult.meta.hasNextPage,
        hasPrevPage: paginatedResult.meta.hasPrevPage,
        nextPage: paginatedResult.meta.nextPage,
        prevPage: paginatedResult.meta.prevPage,
      }
    };
    
    return new SuccessResponse<ListStudentResponse>("global.success", response);
  }
}
