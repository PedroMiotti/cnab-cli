import fs from "fs";
import ora from "ora";
import path from "path";
import chalk from "chalk";
import { Command } from "commander";

import { searchSegmentLines } from "../lib/searchSegmentLines";

import { sleep } from "../utils/promiseHelpers";
import { askMissingOptions } from "../utils/inquirerHelpers";

const parseCommand = new Command("parse")
  .description("Busca informações em segmentos do arquivo CNAB")
  .option("-f, --from <number>", "posição inicial", parseInt)
  .option("-t, --to <number>", "posição final", parseInt)
  .option("-s, --segment <char>", "segmento desejado (P, Q, R...)")
  .option(
    "--file <path>",
    "caminho para o arquivo CNAB",
    "__mocks__/cnabExample.rem"
  )
  .action(async (options) => {
    let { from, to, segment, file } = options;

    const resolved = await askMissingOptions({ from, to, segment });
    from = resolved.from;
    to = resolved.to;
    segment = resolved.segment;

    const fullPath = path.resolve(file);
    if (!fs.existsSync(fullPath)) {
      console.log(chalk.red(`Arquivo não encontrado: ${fullPath}`));
      process.exit(1);
    }

    if (isNaN(from) || isNaN(to) || !segment) {
      console.log(chalk.red("Parâmetros inválidos. Verifique as opções."));
      process.exit(1);
    }

    const spinner = ora("Iniciando leitura do arquivo CNAB...").start();

    await sleep(1000);

    if (file === "__mocks__/cnabExample.rem")
      spinner.warn(
        chalk.yellow(
          "Utilizando __mocks__/cnabExample.rem como arquivo de entrada."
        )
      );

    try {
      const results = await searchSegmentLines(fullPath, from, to, segment);
      spinner.succeed(chalk.green(`Busca concluída com sucesso!`));

      if (results.length === 0) {
        console.log(chalk.yellow("Nenhum segmento correspondente encontrado."));
      } else {
        results.forEach((result) => {
          console.log(
            `${chalk.blue(`Linha ${result.lineNumber}`)} | ` +
              `${chalk.green(`"${result.extracted}"`)} ` +
              `(posições ${from}-${to})`
          );
        });
      }
    } catch (error) {
      spinner.fail(chalk.red("Erro ao processar o arquivo CNAB"));
      console.error(error);
    }
  });

export default parseCommand;
