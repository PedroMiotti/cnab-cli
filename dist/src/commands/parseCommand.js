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
const searchSegmentLines_1 = require("../lib/searchSegmentLines");
const promiseHelpers_1 = require("../utils/promiseHelpers");
const inquirerHelpers_1 = require("../utils/inquirerHelpers");
const parseCommand = new commander_1.Command("parse")
    .description("Busca informações em segmentos do arquivo CNAB")
    .option("-f, --from <number>", "posição inicial", parseInt)
    .option("-t, --to <number>", "posição final", parseInt)
    .option("-s, --segment <char>", "segmento desejado (P, Q, R...)")
    .option("--file <path>", "caminho para o arquivo CNAB", "__mocks__/cnabExample.rem")
    .action(async (options) => {
    let { from, to, segment, file } = options;
    const resolved = await (0, inquirerHelpers_1.askMissingOptions)({ from, to, segment });
    from = resolved.from;
    to = resolved.to;
    segment = resolved.segment;
    const fullPath = path_1.default.resolve(file);
    if (!fs_1.default.existsSync(fullPath)) {
        console.log(chalk_1.default.red(`Arquivo não encontrado: ${fullPath}`));
        process.exit(1);
    }
    if (isNaN(from) || isNaN(to) || !segment) {
        console.log(chalk_1.default.red("Parâmetros inválidos. Verifique as opções."));
        process.exit(1);
    }
    const spinner = (0, ora_1.default)("Iniciando leitura do arquivo CNAB...").start();
    await (0, promiseHelpers_1.sleep)(1000);
    if (file === "__mocks__/cnabExample.rem")
        spinner.warn(chalk_1.default.yellow("Utilizando __mocks__/cnabExample.rem como arquivo de entrada."));
    try {
        const results = await (0, searchSegmentLines_1.searchSegmentLines)(fullPath, from, to, segment);
        spinner.succeed(chalk_1.default.green(`Busca concluída com sucesso!`));
        if (results.length === 0) {
            console.log(chalk_1.default.yellow("Nenhum segmento correspondente encontrado."));
        }
        else {
            results.forEach((result) => {
                console.log(`${chalk_1.default.blue(`Linha ${result.lineNumber}`)} | ` +
                    `${chalk_1.default.green(`"${result.extracted}"`)} ` +
                    `(posições ${from}-${to})`);
            });
        }
    }
    catch (error) {
        spinner.fail(chalk_1.default.red("Erro ao processar o arquivo CNAB"));
        console.error(error);
    }
});
exports.default = parseCommand;
