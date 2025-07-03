module.exports = async function () {
  await globalThis.mongoServer.stop();
};
