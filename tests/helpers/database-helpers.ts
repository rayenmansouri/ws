import mongoose from 'mongoose';
import { BaseUserModel } from '../../src/feature/user-management/base-user/domain/base-user.schema';
import { UserTypeEnum } from '../../src/feature/user-management/factory/enums';
import { CreateBaseUser } from '../../src/feature/user-management/base-user/domain/base-user.entity';
import { TestUser, createTestUser } from './test-data';

export class DatabaseHelper {
  static async createUserInDB(testUser: Partial<TestUser> = {}): Promise<any> {
    const userData = await createTestUser(testUser);
    
    const userPayload: Omit<CreateBaseUser, 'id'> = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      password: userData.hashedPassword, // Use hashed password
      schoolSubdomain: userData.schoolSubdomain || 'test-school',
      type: UserTypeEnum.ADMIN, // Default to admin type
      roles: [], // Empty roles for now
    };

    const user = new BaseUserModel(userPayload);
    await user.save();
    
    return {
      user,
      plainPassword: userData.password // Return plain password for testing
    };
  }

  static async createMasterUser(testUser: Partial<TestUser> = {}): Promise<any> {
    const userData = await createTestUser(testUser);
    
    const userPayload: Omit<CreateBaseUser, 'id'> = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      password: userData.hashedPassword,
      schoolSubdomain: 'master',
      type: UserTypeEnum.MASTER, // Explicitly set as MASTER
      roles: [],
    };

    const user = new BaseUserModel(userPayload);
    await user.save();
    
    return {
      user,
      plainPassword: userData.password
    };
  }

  static async findUserByEmail(email: string): Promise<any> {
    return BaseUserModel.findOne({ email });
  }

  static async findUserByCredential(credential: string): Promise<any> {
    return BaseUserModel.findOne({
      $or: [
        { email: credential },
        { phoneNumber: credential }
      ]
    });
  }

  static async clearUsers(): Promise<void> {
    await BaseUserModel.deleteMany({});
  }

  static async closeConnection(): Promise<void> {
    await mongoose.connection.close();
  }
}