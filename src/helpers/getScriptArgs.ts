export const getScriptArgs = (): string[] => {
  const scriptArgsTagIndex = process.argv.findIndex(arg => arg === "--scriptArgs");
  const scriptArgs = scriptArgsTagIndex !== -1 ? process.argv.slice(scriptArgsTagIndex + 1) : [];
  return scriptArgs;
};
