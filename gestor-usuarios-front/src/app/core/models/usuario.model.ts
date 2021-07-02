import { IPerfil } from "./perfil.model";

export interface IUsuario {
  id: number;
  nome: string;
  cpf: string;
  dataNascimento?: string;
  sexo?: string;
  cargo_id: number;
  perfis: IPerfil[];
}

export class Usuario implements IUsuario {
  id: number = 0;
  nome: string = "";
  cpf: string = "";
  dataNascimento: string = null;
  sexo: string = "";
  cargo_id: number = 1;
  perfis: IPerfil[] = [];
}
