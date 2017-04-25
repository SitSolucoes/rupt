export class Leitor {
    id: number;
    nome: string;
    nick: string;
    sexo: string;
    nascimento: Date;
    src_foto: string;
    email: string;
    password: string;

    constructor(){
        this.src_foto = "path_do_sem_imagem";
        this.sexo = "m";
    }
}
