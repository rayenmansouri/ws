const { MongoMemoryReplSet } = require('mongodb-memory-server');

module.exports = async function () {
  const mongoServer = await MongoMemoryReplSet.create({
    instanceOpts: [
      {
        port: 12345,
      },
    ],
  });

  const URIwithRemovedParams = mongoServer.getUri().split('?')[0];
  console.log({ URI: URIwithRemovedParams });

  globalThis.mongoServer = mongoServer;
};
