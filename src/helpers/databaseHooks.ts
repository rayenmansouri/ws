import { NextFunction } from "express";
import mongoose from "mongoose";
import { ICounterSchema } from "../core/newId/CounterModel";
import { IUser } from "../types/entities";

export function preSaveHook(schema: mongoose.Schema): void {
  schema.pre<{ isModified(field: string): boolean } & IUser>(
    //@ts-ignore
    "save",
    async function (next: NextFunction) {
      if (this.isModified("firstName") || this.isModified("lastName")) {
        this.firstName = this.firstName
          .trim()
          .toLowerCase()
          .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase());
        this.lastName = this.lastName
          .trim()
          .toLowerCase()
          .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase());
        this.fullName = this.firstName + " " + this.lastName;
      }
      next();
    },
  );
}
export function preFindOneAndUpdateHook(schema: mongoose.Schema): void {
  //@ts-ignore
  schema.pre("findOneAndUpdate", async function (next: NextFunction) {
    const data: any = this.getUpdate();
    if (data && (data.firstName || data.lastName)) {
      let result: any;
      if (!data.firstName || !data.lastName) result = await this.clone().exec();

      let newFirstName: string;
      let newLastName: string;

      if (data.firstName)
        newFirstName = data.firstName
          .trim()
          .toLowerCase()
          .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase());
      else newFirstName = result[0].firstName;

      if (data.lastName)
        newLastName = data.lastName
          .trim()
          .toLowerCase()
          .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase());
      else newLastName = result[0].lastName;

      this.setUpdate({
        $set: {
          ...data,
          firstName: newFirstName,
          lastName: newLastName,
          fullName: newFirstName + " " + newLastName,
        },
      });
    }
    next();
  });
}

export const addNewIDMiddleware = (schema: mongoose.Schema): void => {
  schema.pre<any>("save", async function (next) {
    if (!this.newId) {
      const collectionName = this.collection.name;
      const counter = (await this.db
        .model("counter")
        .findOneAndUpdate(
          { collectionName },
          { $inc: { count: 1 } },
          { new: true },
        )) as ICounterSchema;
      this.newId = String(counter.count).padStart(5, "0");
    }
    next();
  });
};

function convertObjectIdsToStrings(obj: any): void {
  if (Array.isArray(obj)) {
    obj.forEach(convertObjectIdsToStrings); // Recursively process arrays
  } else if (isPlainObject(obj)) {
    Object.keys(obj).forEach(key => {
      if (
        [
          "__parentArray",
          "activePaths",
          "pathsToScopes",
          "__index",
          "$__parent",
          "$__",
          "$errors",
          "$isNew",
        ].includes(key)
      )
        return;
      if (obj[key] instanceof mongoose.Types.ObjectId) {
        obj[key] = obj[key].toString(); // Convert ObjectId to string
      } else if (Array.isArray(obj[key])) {
        if (obj[key].length === 0) return;

        if (obj[key][0] instanceof mongoose.Types.ObjectId) {
          obj[key] = obj[key].map(mongoId => mongoId.toString());
          return;
        }

        obj[key].forEach(convertObjectIdsToStrings); // Recursively process arrays
      } else if (isPlainObject(obj[key])) {
        convertObjectIdsToStrings(obj[key]); // Recursively handle nested objects
      }
    });
  }
}

function isPlainObject(param: unknown): boolean {
  return (
    param !== null && // Exclude null
    typeof param === "object" && // Check if it's an object
    !(param instanceof Array) && // Exclude arrays
    !(param instanceof Date) && // Exclude Date objects
    !(param instanceof RegExp) && // Exclude RegExp objects
    !(param instanceof Buffer) && // Exclude Buffer objects (for Node.js)
    !(param instanceof Map) && // Exclude Map objects
    !(param instanceof Set) && // Exclude Set objects
    Object.prototype.toString.call(param) === "[object Object]" // Ensure it's a plain object
  );
}

// Mongoose plugin to handle automatic `.lean()` and ObjectId to string conversion
export function autoLeanAndConvertObjectId(schema: any): void {
  // Automatically apply `.lean()` to all read queries
  schema.pre(
    ["find", "findOne", "findById", "findOneAndUpdate", "findByIdAndUpdate", "distinct"],
    function () {
      this.lean();
    },
  );

  // Post middleware to convert ObjectId fields to strings after read queries
  schema.post(
    ["find", "findOne", "findById", "findOneAndUpdate", "findByIdAndUpdate", "distinct"],
    function (docs: any) {
      if (Array.isArray(docs)) {
        docs.forEach(doc => convertObjectIdsToStrings(doc)); // Convert ObjectId in arrays
      } else {
        convertObjectIdsToStrings(docs); // Convert ObjectId in single document
      }
    },
  );

  // Post middleware for create and insert operations
  schema.post(["insertMany", "save", "create"], function (docs: any) {
    if (Array.isArray(docs)) {
      docs.forEach(doc => convertObjectIdsToStrings(doc._doc)); // Convert ObjectId in arrays
    } else {
      convertObjectIdsToStrings(docs._doc); // Convert ObjectId in single document
    }
  });

  // Post middleware for update and replace operations
  schema.post(
    ["updateOne", "updateMany", "findOneAndUpdate", "findByIdAndUpdate", "replaceOne"],
    function (result: any) {
      if (result) {
        convertObjectIdsToStrings(result);
      }
    },
  );

  // Post middleware for delete operations
  schema.post(
    ["deleteOne", "deleteMany", "findOneAndDelete", "findByIdAndDelete", "remove"],
    function (result: any) {
      if (result) {
        convertObjectIdsToStrings(result);
      }
    },
  );

  // Post middleware for aggregation to convert ObjectId in aggregation results
  schema.post("aggregate", function (result: any) {
    result.forEach((doc: any) => convertObjectIdsToStrings(doc)); // Convert ObjectId in aggregation results
  });
}
