import path from "path";
import { searchSegmentLines } from "../../src/lib/searchSegmentLines";

describe("(TASK-001) Busca por Segmentos", () => {
  it("should extract correct names from segment Q", async () => {
    const mockPath = path.resolve(__dirname, "../__mocks__/sample-cnab.txt");

    const results = await searchSegmentLines(mockPath, 34, 73, "q");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty("lineNumber");
    expect(results[0]).toHaveProperty("extracted");
    expect(results[0].extracted).toMatch(/BRASIL|REDECARD|ELECTROLUX/i);
  });
});
