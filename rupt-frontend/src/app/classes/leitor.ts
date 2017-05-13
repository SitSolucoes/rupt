export class Leitor {
    id: number;
    nome: string;
    nick: string;
    sexo: string;
    nascimento: Date;
    src_foto: string;
    email: string;
    password: string;

    
    constructor(id: number, nome: string, nick: string, sexo: string,  
                nascimento: Date,src_foto: string, email: string, password: string){
         this.id = id;
         this.nome = nome;
         this.nick = nick;
         this.sexo = sexo;
         this.nascimento = nascimento;
         this.src_foto = src_foto;
         this.email = email;
         this.password = password;
    }
}
