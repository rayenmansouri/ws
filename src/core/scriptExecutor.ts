import { exec, ExecException } from "child_process";

const executeScript = (scriptName: string, scriptArgs: string[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const command = `ts-node ./src/scripts/${scriptName}.ts ${scriptArgs.join(" ")}`;
    const childProcess = exec(command);

    childProcess.stdout?.on("data", (data: string | Buffer) => {
      console.log(data.toString());
    });

    childProcess.stderr?.on("data", (data: string | Buffer) => {
      console.error(`Error: ${data.toString()}`);
    });

    childProcess.on("error", (err: ExecException) => {
      console.error(`Error executing script: ${err.message}`);
      reject(err);
    });

    childProcess.on("close", (code: number) => {
      if (code === 0) {
        console.log(`Script '${scriptName}' executed successfully.`);
        resolve();
      } else {
        console.error(`Script '${scriptName}' exited with code ${code}.`);
        reject(new Error(`Script '${scriptName}' exited with code ${code}.`));
      }
    });
  });
};

const main = async () => {
  const args = process.argv.slice(2);
  const scriptNameArgIndex = args.findIndex(arg => arg === "--scriptName");

  if (scriptNameArgIndex === -1 || scriptNameArgIndex + 1 >= args.length) {
    console.error("Please provide a script name using --scriptName argument.");
    process.exit(1);
  }

  const scriptName = args[scriptNameArgIndex + 1];

  try {
    await executeScript(scriptName, process.argv);
  } catch (error) {
    console.error("Failed to run script:", error);
    process.exit(1);
  }
};

main();
