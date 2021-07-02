export interface IPerfil {
  id: number;
  nome: string;
}

export class Perfil implements IPerfil {
  id: number = 0;
  nome: string = "";
}
