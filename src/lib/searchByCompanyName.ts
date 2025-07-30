import fs from "fs";
import readline from "readline";
import { CompanySearchResult } from "../types/search";

export async function searchByCompanyName(
  filePath: string,
  query: string
): Promise<CompanySearchResult[]> {
  const results: CompanySearchResult[] = [];

  const stream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
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
