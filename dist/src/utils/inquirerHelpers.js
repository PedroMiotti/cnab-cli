"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askMissingOptions = askMissingOptions;
const inquirer_1 = __importDefault(require("inquirer"));
async function askMissingOptions(current) {
    const answers = await inquirer_1.default.prompt([
        {
            type: "number",
            name: "from",
            message: "Posição inicial:",
            when: () => current.from === undefined,
        },
        {
            type: "number",
            name: "to",
            message: "Posição final:",
            when: () => current.to === undefined,
        },
        {
            type: "input",
            name: "segment",
            message: "Segmento (ex: P, Q, R):",
            when: () => current.segment === undefined,
        },
    ]);
    return {
        from: current.from ?? answers.from,
        to: current.to ?? answers.to,
        segment: current.segment ?? answers.segment,
    };
}
