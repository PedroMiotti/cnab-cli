import fs from "fs";
import ora from "ora";
import path from "path";
import chalk from "chalk";
import { Command } from "commander";

import { searchByCompanyName } from "../lib/searchByCompanyName";

import { sleep } from "../utils/promiseHelpers";

const searchCommand = new Command("search")
  .description("Busca uma empresa pelo nome no arquivo CNAB")
  .requiredOption("--name <string>", "Nome ou parte do nome da empresa")
  .option(
    "--file <path>",
    "Caminho do arquivo CNAB",
    "__mocks__/cnabExample.rem"
  )
  .action(async (options) => {
    const { name, file } = options;
    const inputPath = path.resolve(file);

    if (!fs.existsSync(inputPath)) {
      console.log(chalk.red(`Arquivo não encontrado: ${inputPath}`));
      process.exit(1);
    }

    const spinner = ora(`Buscando "${name}" no arquivo...`).start();

    await sleep(1000);

    if (file === "__mocks__/cnabExample.rem")
      spinner.warn(
        chalk.yellow(
          "Utilizando __mocks__/cnabExample.rem como arquivo de entrada."
        )
      );

    try {
      const results = await searchByCompanyName(inputPath, name);

      if (results.length === 0) {
        spinner.warn(
          chalk.yellow(`Nenhuma ocorrência de "${name}" encontrada.`)
        );
      } else {
        spinner.succeed(
          chalk.green(`Encontrado em ${results.length} linha(s):`)
        );
        results.forEach((result) => {
          console.log(
            `${chalk.blue("Linha")} ${result.lineNumber} ` +
              `(${chalk.magenta("Segmento")} ${result.segment}) → ` +
              `query ${chalk.green(result.matchedText)} ` +
              `posição ${result.position}: ${chalk.green(
                result.fullCompanyName
              )}`
          );
        });
      }
    } catch (err) {
      spinner.fail(chalk.red("Erro ao realizar a busca"));
      console.error(err);
    }
  });

export default searchCommand;
