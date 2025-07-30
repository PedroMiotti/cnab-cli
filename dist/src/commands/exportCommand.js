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
const exportToJson_1 = require("../lib/exportToJson");
const promiseHelpers_1 = require("../utils/promiseHelpers");
const exportCommand = new commander_1.Command("export")
    .description("Exporta os dados de empresas e endereços do CNAB (segmento Q) para JSON")
    .option("--file <path>", "Caminho para o arquivo CNAB", "__mocks__/cnabExample.rem")
    .option("--out <path>", "Caminho do arquivo de saída JSON", "output.json")
    .action(async (options) => {
    const { file, out } = options;
    const inputPath = path_1.default.resolve(file);
    const outputPath = path_1.default.resolve(out);
    if (!fs_1.default.existsSync(inputPath)) {
        console.log(chalk_1.default.red(`Arquivo não encontrado: ${inputPath}`));
        process.exit(1);
    }
    const spinner = (0, ora_1.default)("Lendo e exportando dados...").start();
    await (0, promiseHelpers_1.sleep)(1000);
    if (file === "__mocks__/cnabExample.rem")
        spinner.warn(chalk_1.default.yellow("Utilizando __mocks__/cnabExample.rem como arquivo de entrada."));
    try {
        await (0, exportToJson_1.exportSegmentQData)(inputPath, outputPath);
        spinner.succeed(chalk_1.default.green(`Exportado com sucesso para ${outputPath}`));
    }
    catch (err) {
        spinner.fail(chalk_1.default.red("Erro ao exportar os dados"));
        console.error(err);
    }
});
exports.default = exportCommand;
