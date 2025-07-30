"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByCompanyName = searchByCompanyName;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
async function searchByCompanyName(filePath, query) {
    const results = [];
    const stream = fs_1.default.createReadStream(filePath);
    const rl = readline_1.default.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });
    let lineNumber = 0;
    for await (const line of rl) {
        lineNumber++;
        const segment = line[13]?.toLowerCase();
        const content = line.toLowerCase();
        const queryLower = query.toLowerCase();
        const position = content.indexOf(queryLower);
        if (position !== -1) {
            const matchedText = line.slice(position, position + query.length);
            const fullCompanyName = line.slice(34, 73).trim();
            results.push({
                lineNumber,
                fullLine: line,
                matchedText,
                fullCompanyName,
                position: position + 1, // posição 1-indexed
                segment: segment?.toUpperCase() || "?",
            });
        }
    }
    return results;
}
