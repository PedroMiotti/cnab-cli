"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerCommands;
const parseCommand_1 = __importDefault(require("./parseCommand"));
const exportCommand_1 = __importDefault(require("./exportCommand"));
const searchCommand_1 = __importDefault(require("./searchCommand"));
function registerCommands(program) {
    program.addCommand(parseCommand_1.default);
    program.addCommand(exportCommand_1.default);
    program.addCommand(searchCommand_1.default);
}
