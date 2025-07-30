import fs from "fs";
import ora from "ora";
import path from "path";
import chalk from "chalk";
import { Command } from "commander";

import { exportSegmentQData } from "../lib/exportToJson";

import { sleep } from "../utils/promiseHelpers";

const exportCommand = new Command("export")
  .description(
    "Exporta os dados de empresas e endereços do CNAB (segmento Q) para JSON"
  )
  .option(
    "--file <path>",
    "Caminho para o arquivo CNAB",
    "__mocks__/cnabExample.rem"
  )
  .option("--out <path>", "Caminho do arquivo de saída JSON", "output.json")
  .action(async (options) => {
    const { file, out } = options;
    const inputPath = path.resolve(file);
    const outputPath = path.resolve(out);

    if (!fs.existsSync(inputPath)) {
      console.log(chalk.red(`Arquivo não encontrado: ${inputPath}`));
      process.exit(1);
    }

    const spinner = ora("Lendo e exportando dados...").start();

    await sleep(1000);

    if (file === "__mocks__/cnabExample.rem")
      spinner.warn(
        chalk.yellow(
          "Utilizando __mocks__/cnabExample.rem como arquivo de entrada."
        )
      );

    try {
      await exportSegmentQData(inputPath, outputPath);
      spinner.succeed(chalk.green(`Exportado com sucesso para ${outputPath}`));
    } catch (err) {
      spinner.fail(chalk.red("Erro ao exportar os dados"));
      console.error(err);
    }
  });

export default exportCommand;
