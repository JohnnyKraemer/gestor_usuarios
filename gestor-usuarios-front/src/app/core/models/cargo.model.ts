export interface ICargo {
  id: number;
  nome: string;
}

export class Cargo implements ICargo {
  id: number = 0;
  nome: string = "";
}
