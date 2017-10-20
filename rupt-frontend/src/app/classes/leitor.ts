import { CategoriaLeitor } from './categoria-leitor';
import { Escritor } from './escritor';

export class Leitor {
    id: number;
    nome: string;
    nick: string;
    sexo: string;
    nascimento: string;
    src_foto: string;
    src_capa: string;
    biografia: string;
    email: string;
    password: string;
    ativo: boolean;
    
    escritor: Escritor;
    categoria_leitor: CategoriaLeitor[];
    
    constructor(){
        this.id = 0;
        this.src_foto = "default.png";
        this.src_capa = 'capa.png';
        this.sexo = "m";
        this.ativo = true;
    }

    setLeitor(leitor: Leitor){
        this.id = leitor.id;
        this.nome = leitor.nome;
        this.nick = leitor.nick;
        this.sexo = leitor.sexo;
        this.nascimento = leitor.nascimento;
        this.src_foto = leitor.src_foto;
        this.email = leitor.email;
        this.ativo = leitor.ativo;
    }
}
