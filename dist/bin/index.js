#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commands_1 = __importDefault(require("../src/commands"));
const program = new commander_1.Command();
program
    .name("cnab-cli")
    .description("CLI para leitura e exportação de dados de arquivos CNAB")
    .version("1.0.0");
(0, commands_1.default)(program);
program.parse(process.argv);
