import { Leitor } from "./leitor";

export class Notificacao {
    id: number;
    escritor: Leitor;
    leitor: Leitor;
    descricao: string;
    rota: string;
    lida: boolean;
    updated_at: Date;
}
