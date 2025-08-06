import { NextFunction, Response } from "express";
import { END_USER_ENUM, TEndUserEnum } from "../../../constants/globalEnums";
import { BaseUser } from "../../../feature/user-management/base-user/domain/base-user.entity";
// Commented out - these repositories were deleted during refactoring
// import { MongoAdminRepo } from "../../../newDatabase/mongo/repositories/MongoAdmin.repo";
// import { MongoParentRepo } from "../../../newDatabase/mongo/repositories/MongoParent.repo";
// import { MongoStudentRepo } from "../../../newDatabase/mongo/repositories/MongoStudent.repo";
// import { MongoTeacherRepo } from "../../../newDatabase/mongo/repositories/MongoTeacher.repo";
import { OmitFromEnum } from "../../../types/utils/enums.util";
import { AuthFailureError } from "../../ApplicationErrors";
import { Middleware, TypedRequest } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { container } from "../../container/container";
import { Role } from "../../../feature/authorization/domain/role.entity";

export const verifyJWT = (entity: OmitFromEnum<TEndUserEnum, "master">): Middleware =>
  asyncHandlerForMiddleware(async (req: TypedRequest, _: Response, next: NextFunction) => {
    let user: Omit<BaseUser, "roles"> & { roles: Role[] };
    const connection = req.DBConnection;

      // Simplified user loading - many user types were deleted during refactoring
  // For now, create a basic user object from the JWT payload
  user = {
    id: req.userId,
    roles: [], // Will be populated by specific implementations if needed
    isActive: true,
    email: '', // TODO: Extract from JWT if needed
    firstName: '',
    lastName: '',
    fullName: '',
    type: entity,
    schoolSubdomain: req.tenantId,
    passwordChangedAt: null
  } as any;
  
  /* 
  // TODO: Restore user loading once repositories are available
  switch (entity) {
    case END_USER_ENUM.ADMIN: {
      // Admin repository loading - commented out until repositories are restored
      break;
    }
    // Other user types commented out as repositories were deleted
  }
  */
    if (!user.isActive)
      throw new AuthFailureError("authentication.invalidCredentials", { isActive: false });

    if (
      user.passwordChangedAt &&
      Math.floor(user.passwordChangedAt.getTime() / 1000) > req.tokenExpires
    )
      throw new AuthFailureError("Invalid token");

    req.user = user;
    req.userType = entity;

    next();
  });
