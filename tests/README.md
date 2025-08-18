# E2E Tests

This directory contains end-to-end tests for the IECD Backend application using Jest framework.

## Structure

```
tests/
├── e2e/
│   └── auth/
│       └── login/
│           └── login.test.ts          # Login route e2e tests
├── helpers/
│   ├── database-helpers.ts            # Database utilities for tests
│   ├── setup.ts                       # Jest test setup and teardown
│   ├── test-app.ts                    # Simplified Express app for testing
│   ├── test-data.ts                   # Test data generators
│   └── index.ts                       # Helper exports
├── .env.test                          # Test environment variables
└── README.md                          # This file
```

## Running Tests

### Run all e2e tests:
```bash
npm run test:e2e
```

### Run e2e tests in watch mode:
```bash
npm run test:e2e:watch
```

## Test Coverage

### Login Route Tests (`/auth/public/login`)

**Successful Login:**
- ✅ Login with valid email and password
- ✅ Login as master user
- ⏭️ Login with phone number (skipped - schema limitation)

**Authentication Failures:**
- ✅ User not found error
- ✅ Invalid password error

**Validation Errors:**
- ✅ Missing credential
- ✅ Missing password  
- ✅ Invalid email format
- ✅ Password too short
- ✅ Empty request body

**Edge Cases:**
- ✅ Case insensitive email login
- ✅ Extra whitespace handling
- ✅ SQL injection prevention

**Performance & Security:**
- ✅ Response time validation
- ✅ No sensitive data exposure

## Test Environment

- **Database:** In-memory MongoDB using `mongodb-memory-server`
- **JWT Secret:** Test-specific secret for token generation
- **Test Isolation:** Each test has a clean database state
- **Timeout:** 30 seconds per test

## Key Features

1. **Complete Database Isolation:** Each test runs with a fresh in-memory database
2. **Real HTTP Testing:** Uses `supertest` for actual HTTP requests
3. **Comprehensive Coverage:** Tests success cases, error cases, validation, and edge cases
4. **Security Testing:** Validates no password exposure and injection prevention
5. **Performance Testing:** Ensures reasonable response times

## Adding New Tests

1. Create test files in the appropriate `e2e/` subdirectory
2. Use the helper functions from `tests/helpers/` for database setup
3. Follow the existing pattern for test structure and assertions
4. Remember to test both success and failure scenarios

## Notes

- Phone number login test is skipped because the base user schema doesn't include phoneNumber field
- The test app uses a simplified route registration to avoid circular dependency issues
- Environment variables are set before any imports to ensure proper configuration loading