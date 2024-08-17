import { Command } from "commander";

const program = new Command();

program
  .option("-p, ==port <number>", "definir puerto del server", 8000)
  .option("-m, --mode <string>", "definir modo del server", "dev")
  .requiredOption("-u, --user <string>", "definir user del server", "admin");
program.parse();
console.log("Options", program.opts());
console.log("Arguments:", program.args);
