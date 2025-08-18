import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

export interface TestUser {
  email: string;
  phoneNumber: string;
  password: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  schoolSubdomain?: string;
}

export const createTestUser = async (overrides?: Partial<TestUser>): Promise<TestUser> => {
  const password = overrides?.password || 'testpassword123';
  const hashedPassword = await bcrypt.hash(password, 12);
  
  return {
    email: overrides?.email || faker.internet.email(),
    phoneNumber: overrides?.phoneNumber || `+1${faker.string.numeric(10)}`,
    password,
    hashedPassword,
    firstName: overrides?.firstName || faker.person.firstName(),
    lastName: overrides?.lastName || faker.person.lastName(),
    schoolSubdomain: overrides?.schoolSubdomain || faker.internet.domainWord(),
    ...overrides
  };
};

export const validLoginCredentials = {
  email: 'test@example.com',
  phoneNumber: '+1234567890',
  password: 'testpassword123'
};

export const invalidLoginCredentials = {
  invalidEmail: 'invalid-email',
  shortPassword: '123',
  wrongPassword: 'wrongpassword',
  nonExistentEmail: 'nonexistent@example.com',
  nonExistentPhone: '+9999999999'
};

export const createLoginPayload = (credential: string, password: string) => ({
  credential,
  password
});