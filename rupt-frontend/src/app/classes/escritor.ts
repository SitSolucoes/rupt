import { Leitor } from './leitor';

export class Escritor extends Leitor{
    leitor_idLeitor: number;
    rg: number;
    cpf: number;
    src_rg: string;
    src_cpf: string;
    src_foto: string;
    biografia: string;
    banco: string;
    agencia: string;
    conta_corrente: string;
    created_at: Date;
    updated_at: Date;
}
