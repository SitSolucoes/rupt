import { Leitor } from './leitor';

export class Escritor extends Leitor{
    //leitor: Leitor;
    rg: string;
    cpf: string;
    src_rg: string;
    src_cpf: string;
    src_foto: string;
    biografia: string;
    banco: string;
    agencia: string;
    conta_corrente: string;
    created_at: string;
    updated_at: Date;
    status: string;
    movivo_recusa: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;

    constructor(){
        super ();
        this.status = 'a';
    }

    setLeitor(leitor: Leitor){
        super.setLeitor(leitor);
        this.status = 'a';
    }
    
}
