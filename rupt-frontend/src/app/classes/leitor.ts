export class Leitor {
    id: number;
    nome: string;
    nick: string;
    sexo: string;
    nascimento: string;
    src_foto: string;
    email: string;
    password: string;
    ativo: boolean;
    
    constructor(){
        this.id = 0;
        this.src_foto = "path_do_sem_imagem";
        this.sexo = "m";
        this.ativo = true;
    }
}
