import fs from "fs";
import readline from "readline";
import { CnabSegmentResult } from "../types/cnab";

export async function searchSegmentLines(
  filePath: string,
  from: number,
  to: number,
  segment: string
): Promise<CnabSegmentResult[]> {
  const results: CnabSegmentResult[] = [];

  const stream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
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
