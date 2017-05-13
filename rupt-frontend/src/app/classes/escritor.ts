import { Leitor } from './leitor';

export class Escritor extends Leitor{
    leitor: Leitor;
    rg: string;
    cpf: string;
    src_rg: string;
    src_cpf: string;
    src_foto: string;
    biografia: string;
    banco: string;
    agencia: string;
    conta_corrente: string;
    created_at: Date;
    updated_at: Date;

    

    constructor(leitor: Leitor, rg: string, cpf: string, src_rg: string, src_cpf: string,
                src_foto: string, biografia: string, banco: string, agencia: string,
                conta_corrente: string, created_at: Date, updated_at: Date){
         super(leitor.id, leitor.nome, leitor.nick,
         leitor.sexo, leitor.nascimento, leitor.src_foto, leitor.email,
         leitor.password);
         this.leitor = leitor;
         this.rg = rg;
         this.cpf = cpf;
         this.src_rg = src_rg;
         this.src_cpf = src_cpf;
         this.src_foto = src_foto;
         this.biografia = biografia;
         this.banco = banco;
         this.agencia = agencia;
         this.conta_corrente = conta_corrente;
         this.created_at = created_at;
         this.updated_at = updated_at;
    }
}
