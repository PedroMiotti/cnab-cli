export interface ExportedCompany {
  name: string;
  address: string;
  cep: string;
  city: string;
  state: string;
  neighborhood?: string;
  sourceLine: number;
  positions: {
    name: [number, number];
    address: [number, number];
    neighborhood?: [number, number];
    cep: [number, number];
    city: [number, number];
    state: [number, number];
  };
}
