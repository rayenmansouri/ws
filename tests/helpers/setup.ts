// Set environment variables BEFORE any imports
process.env.JWT_SECRET = 'test-jwt-secret-key-for-e2e-tests';
process.env.JWT_EXPIRES_IN = '7d';
process.env.NODE_ENV = 'test';

import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Application } from 'express';
import app from './test-app';

let mongod: MongoMemoryServer;
let testApp: Application;

beforeAll(async () => {
  // Start in-memory MongoDB instance
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // Connect to in-memory database
  await mongoose.connect(uri);

  // Initialize test app
  testApp = app;
}, 60000);

afterAll(async () => {
  // Close database connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  
  // Stop in-memory MongoDB instance
  if (mongod) {
    await mongod.stop();
  }
}, 60000);

beforeEach(async () => {
  // Clean up all collections before each test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

export { testApp };