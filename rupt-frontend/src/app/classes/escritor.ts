import { Leitor } from './leitor';

export class Escritor extends Leitor{
    rg: string;
    cpf: string;
    telefone: string;
    celular: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cidade: string;
    bairro: string;
    uf: string;
    banco: string;
    agencia: string;
    conta_corrente: string;
    status: string;
    created_at: string;
    data_aceite: string;

    constructor(){
        super ();
        this.status = 'a';
    }

    setLeitor(leitor: Leitor){
        super.setLeitor(leitor);
        this.status = 'a';
    }
    
}
