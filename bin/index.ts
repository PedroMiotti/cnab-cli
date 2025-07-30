#!/usr/bin/env ts-node

import { Command } from "commander";

import registerCommands from "../src/commands";

const program = new Command();

program
  .name("cnab-cli")
  .description("CLI para leitura e exportação de dados de arquivos CNAB")
  .version("1.0.0");

registerCommands(program);

program.parse(process.argv);
