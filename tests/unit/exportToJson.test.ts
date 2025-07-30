import fs from "fs";
import path from "path";

import { exportSegmentQData } from "../../src/lib/exportToJson";

describe("(TASK-003) Exporta Dados em Formato JSON do Segmento Q", () => {
  const mockFile = path.resolve(__dirname, "../__mocks__/sample-cnab.txt");
  const outputFile = path.resolve(
    __dirname,
    "../__mocks__/exported-output.json"
  );

  afterEach(() => {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  });

  it("should export segment Q data to a JSON file", async () => {
    await exportSegmentQData(mockFile, outputFile);

    expect(fs.existsSync(outputFile)).toBe(true);

    const content = fs.readFileSync(outputFile, "utf-8");
    const parsed = JSON.parse(content);

    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThan(0);

    const first = parsed[0];

    expect(first).toHaveProperty("name");
    expect(first).toHaveProperty("address");
    expect(first).toHaveProperty("cep");
    expect(first).toHaveProperty("city");
    expect(first).toHaveProperty("state");
    expect(first).toHaveProperty("positions");
    expect(first).toHaveProperty("sourceLine");
  });

  it("should export correct fields and structure", async () => {
    await exportSegmentQData(mockFile, outputFile);

    const content = fs.readFileSync(outputFile, "utf-8");
    const parsed = JSON.parse(content);

    parsed.forEach((entry: any) => {
      expect(typeof entry.name).toBe("string");
      expect(typeof entry.address).toBe("string");
      expect(typeof entry.cep).toMatch(/string|number/);
      expect(typeof entry.city).toBe("string");
      expect(typeof entry.state).toBe("string");
      expect(entry.positions.name).toEqual([33, 73]);
    });
  });
});
