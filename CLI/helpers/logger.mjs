export class Logger {
  static info(message) {
    console.log(chalk.green(message));
  }

  static error(message) {
    console.error(chalk.red(message));
  }
}
