import parseCommand from './parseCommand';
import exportCommand from './exportCommand';
import searchCommand from './searchCommand';
import { Command } from 'commander';

export default function registerCommands(program: Command) {
  program.addCommand(parseCommand);
  program.addCommand(exportCommand);
  program.addCommand(searchCommand);
}
