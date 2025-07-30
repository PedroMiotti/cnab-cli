import fs from "fs";
import readline from "readline";

import { ExportedCompany } from "../types/export";

export async function exportSegmentQData(
  filePath: string,
  outputPath: string
): Promise<void> {
  const results: ExportedCompany[] = [];

  const stream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  let lineNumber = 0;

  for await (const line of rl) {
    lineNumber++;
    const segmentChar = line[13]?.toLowerCase();
    if (segmentChar === "q") {
      const company: ExportedCompany = {
        name: line.slice(33, 73).trim(),
        address: line.slice(73, 113).trim(),
        neighborhood: line.slice(113, 127).trim() || undefined,
        cep: line.slice(128, 136).trim(),
        city: line.slice(136, 151).trim(),
        state: line.slice(151, 153).trim(),
        sourceLine: lineNumber,
        positions: {
          name: [33, 73],
          address: [73, 113],
          neighborhood: [113, 127],
          cep: [128, 136],
          city: [136, 151],
          state: [151, 153],
        },
      };

      results.push(company);
    }
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");
}
