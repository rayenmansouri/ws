import { Connection } from "mongoose";
import { CounterSchema } from "./CounterModel";

export const initializeNewID = async (connection: Connection): Promise<void> => {
  const CounterModel = connection.model("counter", CounterSchema);

  const models = Object.values(connection.models);

  const counterDocs = await CounterModel.find();

  const countersToInsert = [];

  for (const model of models) {
    const collectionName = model.collection.name;

    const counterDoc = counterDocs.filter(doc => doc.collectionName === collectionName)[0];

    if (!counterDoc) {
      countersToInsert.push({ collectionName });
    }
  }

  await CounterModel.insertMany(countersToInsert);
};
