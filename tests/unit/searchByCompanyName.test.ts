import path from "path";
import { searchByCompanyName } from "../../src/lib/searchByCompanyName";

describe("(TASK-002) Busca por Nome da Empresa", () => {
  it("should find company name in correct line and segment", async () => {
    const filePath = path.resolve(__dirname, "../__mocks__/sample-cnab.txt");
    const results = await searchByCompanyName(
      filePath,
      "BRASIL COMERCIO E SERVICOS"
    );

    expect(results.length).toBe(2);

    results.forEach((res) => {
      expect(res.segment).toBe("Q");
      expect(res.fullLine.toLowerCase()).toContain(
        "brasil comercio e servicos"
      );
      expect(typeof res.position).toBe("number");
    });
  });

  it("should return empty array if no match found", async () => {
    const filePath = path.resolve(__dirname, "../__mocks__/sample-cnab.txt");
    const results = await searchByCompanyName(
      filePath,
      "EMPRESA QUE NAO EXISTE"
    );

    expect(results).toEqual([]);
  });
});
