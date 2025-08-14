import { spawn } from "child_process";
import Logger from "./Logger";

export const executeScript = (scriptName: string): void => {
  const child = spawn("npm", ["run", scriptName]);

  child.stdout.on("data", (data) => {
    Logger.info(data.toString());
  });

  child.stderr.on("data", (data) => {
    Logger.error(`Error: ${data.toString()}`);
  });

  child.on("error", (err) => {
    Logger.error(`Error executing script: ${err.message}`);
  });

  child.on("close", (code) => {
    if (code === 0) {
      Logger.info(`Script '${scriptName}' executed successfully.`);
    } else {
      Logger.error(`Script '${scriptName}' exited with code ${code}.`);
    }
  });
};

export const scriptExecutor = (): void => {
  const args = process.argv.slice(2);
  const scriptNameArg = args.find((arg) => arg.startsWith("--scriptName="));

  if (scriptNameArg) {
    const scriptName = scriptNameArg.split("=")[1];
    executeScript(scriptName);
  } else {
    Logger.error("Please provide a script name using --scriptName argument.");
  }
};

if (require.main === module) {
  try {
    scriptExecutor();
  } catch (error) {
    Logger.error("Failed to run script:", error);
  }
}
