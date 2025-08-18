import request from 'supertest';
import { testApp } from '../../../helpers/setup';
import { DatabaseHelper } from '../../../helpers/database-helpers';
import { 
  validLoginCredentials, 
  invalidLoginCredentials, 
  createLoginPayload 
} from '../../../helpers/test-data';
import { UserTypeEnum } from '../../../../src/feature/user-management/factory/enums';

describe('POST /auth/public/login', () => {
  const loginEndpoint = '/auth/public/login';

  beforeEach(async () => {
    await DatabaseHelper.clearUsers();
  });

  describe('Successful Login', () => {
    it('should login successfully with valid email and password', async () => {
      // Create a test user
      const { plainPassword } = await DatabaseHelper.createUserInDB({
        email: validLoginCredentials.email,
        password: validLoginCredentials.password
      });

      const loginPayload = createLoginPayload(
        validLoginCredentials.email,
        plainPassword
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(200);

      // Verify response structure
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('statusCode', 200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');

      // Verify token is a string
      expect(typeof response.body.data.token).toBe('string');
      expect(response.body.data.token.length).toBeGreaterThan(0);

      // Verify user data structure
      const user = response.body.data.user;
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email', validLoginCredentials.email);
      expect(user).toHaveProperty('firstName');
      expect(user).toHaveProperty('lastName');
      expect(user).toHaveProperty('schoolSubdomain');
      expect(user).toHaveProperty('type');

      // Verify password is not included in response
      expect(user).not.toHaveProperty('password');
    });

    it.skip('should login successfully with valid phone number and password', async () => {
      // Create a test user with phone number
      const testPhoneNumber = '+12345678901';
      const { plainPassword } = await DatabaseHelper.createUserInDB({
        email: 'phone-user@test.com',
        phoneNumber: testPhoneNumber,
        password: validLoginCredentials.password
      });

      const loginPayload = createLoginPayload(
        testPhoneNumber,
        plainPassword
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('user');
    });

    it('should login master user successfully', async () => {
      const { plainPassword } = await DatabaseHelper.createMasterUser({
        email: 'master@test.com',
        password: validLoginCredentials.password
      });

      const loginPayload = createLoginPayload(
        'master@test.com',
        plainPassword
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body.data.user.type).toBe(UserTypeEnum.MASTER);
    });
  });

  describe('Authentication Failures', () => {
    it('should return 400 when user does not exist', async () => {
      const loginPayload = createLoginPayload(
        invalidLoginCredentials.nonExistentEmail,
        validLoginCredentials.password
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(400);

      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('userNotFound');
    });

    it('should return 400 when password is incorrect', async () => {
      const { user } = await DatabaseHelper.createUserInDB({
        email: validLoginCredentials.email,
        password: validLoginCredentials.password
      });

      const loginPayload = createLoginPayload(
        validLoginCredentials.email,
        invalidLoginCredentials.wrongPassword
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(400);

      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('invalidPassword');
    });
  });

  describe('Validation Errors', () => {
    it('should return 400 when credential is missing', async () => {
      const response = await request(testApp)
        .post(loginEndpoint)
        .send({ password: validLoginCredentials.password })
        .expect(400);

      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when password is missing', async () => {
      const response = await request(testApp)
        .post(loginEndpoint)
        .send({ credential: validLoginCredentials.email })
        .expect(400);

      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 when credential is invalid email format', async () => {
      const loginPayload = createLoginPayload(
        invalidLoginCredentials.invalidEmail,
        validLoginCredentials.password
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(400);

      expect(response.body).toHaveProperty('status', 'error');
    });

    it('should return 400 when password is too short', async () => {
      const loginPayload = createLoginPayload(
        validLoginCredentials.email,
        invalidLoginCredentials.shortPassword
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(400);

      expect(response.body).toHaveProperty('status', 'error');
    });

    it('should return 400 when request body is empty', async () => {
      const response = await request(testApp)
        .post(loginEndpoint)
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('status', 'error');
    });
  });

  describe('Edge Cases', () => {
    it('should handle case insensitive email login', async () => {
      const testEmail = 'test@example.com';
      const { plainPassword } = await DatabaseHelper.createUserInDB({
        email: testEmail, // Save with lowercase
        password: validLoginCredentials.password
      });

      const loginPayload = createLoginPayload(
        'Test@Example.Com', // Try with mixed case
        plainPassword
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(200); // The system handles case insensitive matching

      expect(response.body).toHaveProperty('status', 'success');
    });

    it('should handle extra whitespace in credentials', async () => {
      const { plainPassword } = await DatabaseHelper.createUserInDB({
        email: validLoginCredentials.email,
        password: validLoginCredentials.password
      });

      const loginPayload = createLoginPayload(
        `  ${validLoginCredentials.email}  `, // with whitespace
        plainPassword
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(400); // Should fail due to validation

      expect(response.body).toHaveProperty('status', 'error');
    });

    it('should reject SQL injection attempts in credential', async () => {
      const maliciousCredential = "admin@test.com'; DROP TABLE users; --";
      
      const loginPayload = createLoginPayload(
        maliciousCredential,
        validLoginCredentials.password
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(400);

      expect(response.body).toHaveProperty('status', 'error');
    });
  });

  describe('Performance and Security', () => {
    it('should complete login request within reasonable time', async () => {
      const { plainPassword } = await DatabaseHelper.createUserInDB({
        email: validLoginCredentials.email,
        password: validLoginCredentials.password
      });

      const loginPayload = createLoginPayload(
        validLoginCredentials.email,
        plainPassword
      );

      const startTime = Date.now();
      
      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(200);

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(2000); // Should complete within 2 seconds
      expect(response.body).toHaveProperty('status', 'success');
    });

    it('should not expose sensitive information in error messages', async () => {
      const loginPayload = createLoginPayload(
        invalidLoginCredentials.nonExistentEmail,
        validLoginCredentials.password
      );

      const response = await request(testApp)
        .post(loginEndpoint)
        .send(loginPayload)
        .expect(400);

      // Error message should be generic, not revealing database structure
      expect(response.body.message).not.toContain('SELECT');
      expect(response.body.message).not.toContain('MongoDB');
      expect(response.body.message).not.toContain('collection');
    });
  });
});