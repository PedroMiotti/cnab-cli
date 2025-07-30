"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const searchByCompanyName_1 = require("../lib/searchByCompanyName");
const promiseHelpers_1 = require("../utils/promiseHelpers");
const searchCommand = new commander_1.Command("search")
    .description("Busca uma empresa pelo nome no arquivo CNAB")
    .requiredOption("--name <string>", "Nome ou parte do nome da empresa")
    .option("--file <path>", "Caminho do arquivo CNAB", "__mocks__/cnabExample.rem")
    .action(async (options) => {
    const { name, file } = options;
    const inputPath = path_1.default.resolve(file);
    if (!fs_1.default.existsSync(inputPath)) {
        console.log(chalk_1.default.red(`Arquivo não encontrado: ${inputPath}`));
        process.exit(1);
    }
    const spinner = (0, ora_1.default)(`Buscando "${name}" no arquivo...`).start();
    await (0, promiseHelpers_1.sleep)(1000);
    if (file === "__mocks__/cnabExample.rem")
        spinner.warn(chalk_1.default.yellow("Utilizando __mocks__/cnabExample.rem como arquivo de entrada."));
    try {
        const results = await (0, searchByCompanyName_1.searchByCompanyName)(inputPath, name);
        if (results.length === 0) {
            spinner.warn(chalk_1.default.yellow(`Nenhuma ocorrência de "${name}" encontrada.`));
        }
        else {
            spinner.succeed(chalk_1.default.green(`Encontrado em ${results.length} linha(s):`));
            results.forEach((result) => {
                console.log(`${chalk_1.default.blue("Linha")} ${result.lineNumber} ` +
                    `(${chalk_1.default.magenta("Segmento")} ${result.segment}) → ` +
                    `query ${chalk_1.default.green(result.matchedText)} ` +
                    `posição ${result.position}: ${chalk_1.default.green(result.fullCompanyName)}`);
            });
        }
    }
    catch (err) {
        spinner.fail(chalk_1.default.red("Erro ao realizar a busca"));
        console.error(err);
    }
});
exports.default = searchCommand;
