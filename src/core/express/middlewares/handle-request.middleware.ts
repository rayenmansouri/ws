import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { IMiddlewareFunction } from "./interface";
import { container } from "../../container/container";
import { schoolDocStore } from "../../subdomainStore";
import mongoose, { ClientSession } from "mongoose";
import { APIResponse } from "../../responseAPI/APIResponse";
import { BaseController } from "../controllers/BaseController";
import { CONNECTION_POOL_IDENTIFIER, DATABASE_SERVICE_IDENTIFIER } from "../../database/constant";
import { DatabaseService } from "../../database/database.service";

/**
 * Custom error class for request handling errors
 */
export class RequestHandlingError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'RequestHandlingError';
  }
}

/**
 * Enhanced request handler middleware with better error handling and resource management
 */
export class HandleRequestMiddleware implements IMiddlewareFunction {
  constructor(
    private readonly routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ) {}

  canActivate(): boolean {
    return true;
  }

  /**
   * Main request handling logic with comprehensive error handling and resource management
   */
  async handleRequest(req: TypedRequest<TypedRequestOptions>, res: Response, next: NextFunction): Promise<void> {
    let session: ClientSession | null = null;
    let requestContainer: any = null;
    const startTime = Date.now();

    try {
      // Initialize request context
      req.userType = this.routeConfig.endUser;
      
      // Create scoped container for this request
      requestContainer = container.createChild({ defaultScope: "Singleton" });
      
      // Bind request-scoped dependencies
      this.bindRequestDependencies(req, requestContainer);
      
      // Setup database session if transaction is enabled
      session = await this.setupDatabaseSession(requestContainer);
      
      // Validate controller
      if (!this.routeConfig.controller.identifier) {
        throw new RequestHandlingError('Controller identifier is missing', 500);
      }
      
      // Get and execute controller
      const controller = requestContainer.get<BaseController<TypedRequestOptions>>(
        this.routeConfig.controller.identifier
      );

      if (!controller) {
        throw new RequestHandlingError(
          `Controller not found: ${this.routeConfig.controller.identifier}`, 
          500
        );
      }

      const apiResponse = await controller.handle(req, res);

      // Commit transaction if successful
      if (session) {
        await session.commitTransaction();
      }

      // Send response if it's an APIResponse instance
      if (apiResponse instanceof APIResponse) {
        apiResponse.setLanguage(req.language);
        apiResponse.send(res);
      }

      // Log successful request
      this.logRequest(req, startTime, true);

    } catch (error: unknown) {
      // Rollback transaction on error
      if (session) {
        try {
          await session.abortTransaction();
        } catch (rollbackError) {
          console.error('Transaction rollback failed:', rollbackError);
        }
      }

      // Log failed request
      this.logRequest(req, startTime, false, error);
      
      // Handle different error types
      const handledError = this.handleError(error);
      next(handledError);

    } finally {
      // Cleanup resources
      await this.cleanup(session, requestContainer);
    }
  }

  /**
   * Bind request-specific dependencies to the container
   */
  private bindRequestDependencies(req: TypedRequest<TypedRequestOptions>, requestContainer: any): void {
    try {
      req.container = requestContainer;

      // Bind language if available
      if (req.language) {
        requestContainer.bind("Language").toConstantValue(req.language);
      }

      // Bind school context
      if (req.tenantId && schoolDocStore[req.tenantId]) {
        requestContainer.bind("School").toConstantValue(schoolDocStore[req.tenantId]);
      }

      // Bind database service and connection pool
      const databaseService = requestContainer.get<DatabaseService>(DATABASE_SERVICE_IDENTIFIER);
      requestContainer.bind(CONNECTION_POOL_IDENTIFIER).toConstantValue(databaseService.getConnectionPool());

      // TODO: Remove this deprecated binding
      if (req.DBConnection !== undefined) {
        requestContainer.bind("Connection").toConstantValue(req.DBConnection);
      }

    } catch (error) {
      throw new RequestHandlingError('Failed to bind request dependencies', 500, error as Error);
    }
  }

  /**
   * Setup database session for transactions
   */
  private async setupDatabaseSession(requestContainer: any): Promise<ClientSession | null> {
    if (!this.routeConfig.isTransactionEnabled) {
      return null;
    }

    try {
      const session = await mongoose.connection.startSession();
      session.startTransaction();
      requestContainer.bind("Session").toConstantValue(session);
      return session;
    } catch (error) {
      throw new RequestHandlingError('Failed to start database transaction', 500, error as Error);
    }
  }

  /**
   * Handle and categorize errors
   */
  private handleError(error: unknown): Error {
    if (error instanceof RequestHandlingError) {
      return error;
    }

    if (error instanceof Error) {
      // Check for specific error types and categorize them
      if (error.message.includes('validation')) {
        return new RequestHandlingError('Validation failed', 400, error);
      }
      
      if (error.message.includes('unauthorized')) {
        return new RequestHandlingError('Unauthorized access', 401, error);
      }
      
      if (error.message.includes('not found')) {
        return new RequestHandlingError('Resource not found', 404, error);
      }

      return new RequestHandlingError('Internal server error', 500, error);
    }

    return new RequestHandlingError('Unknown error occurred', 500);
  }

  /**
   * Log request details for monitoring and debugging
   */
  private logRequest(
    req: TypedRequest<TypedRequestOptions>, 
    startTime: number, 
    success: boolean, 
    error?: unknown
  ): void {
    const duration = Date.now() - startTime;
    const logData = {
      method: req.method,
      path: req.path,
      userType: req.userType,
      tenantId: req.tenantId,
      userId: req.userId,
      duration: `${duration}ms`,
      success,
      timestamp: new Date().toISOString(),
    };

    if (success) {
      console.log(`✅ Request completed:`, logData);
    } else {
      console.error(`❌ Request failed:`, { ...logData, error: error?.toString() });
    }
  }

  /**
   * Cleanup resources to prevent memory leaks
   */
  private async cleanup(session: ClientSession | null, requestContainer: any): Promise<void> {
    // End database session
    if (session) {
      try {
        await session.endSession();
      } catch (error) {
        console.error('Failed to end database session:', error);
      }
    }

    // Cleanup container if it has cleanup methods
    if (requestContainer && typeof requestContainer.unbindAll === 'function') {
      try {
        requestContainer.unbindAll();
      } catch (error) {
        console.error('Failed to cleanup request container:', error);
      }
    }
  }

  getMiddleware(): Middleware[] {
    return [this.handleRequest.bind(this)];
  }
}