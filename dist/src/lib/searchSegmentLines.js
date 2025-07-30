"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchSegmentLines = searchSegmentLines;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
async function searchSegmentLines(filePath, from, to, segment) {
    const results = [];
    const stream = fs_1.default.createReadStream(filePath);
    const rl = readline_1.default.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });
    let lineNumber = 0;
    for await (const line of rl) {
        lineNumber++;
        const segmentChar = line[13]?.toLowerCase();
        if (segmentChar === segment.toLowerCase()) {
            const extracted = line.slice(from - 1, to).trim();
            results.push({
                lineNumber,
                extracted,
                fullLine: line,
            });
        }
    }
    return results;
}
