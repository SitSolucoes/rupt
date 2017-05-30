import { Leitor } from './leitor';
import { Admin } from './../admin/admin';

export class Mensagem {
    id: number;
    nome: string;
    assunto: string;
    conteudo: string;
    lida: boolean;
    remetente: string;
    Admin: Admin;
    Leitor: Leitor;
    Mensagem: Mensagem;
    created_at: Date;
    updated_at: Date;

    constructor(){
        this.id = 0;
        this.assunto = "";
        this.conteudo = "";
        this.remetente = "";
        this.lida = false;
    }
}

