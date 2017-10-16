import { Post } from './post';
import { Leitor } from './leitor';
import { Motivo_Denuncia } from './motivo_denuncia';
import { Admin } from 'app/classes/admin';

export class Denuncia {
    id: number;
    post: Post;
    post_titulo: string
    admin: Admin;
    leitor: Leitor;
    motivo: Motivo_Denuncia;
    created_at: Date;
    updated_at: Date;
    quantidade: number;

    constructor(id: number, post: Post, admin: Admin, leitor: Leitor, motivo: Motivo_Denuncia, created_at: Date, updated_at: Date, quantidade: number){
                this.id = id;
                this.post = post;
                this.admin = admin;
                this.leitor = leitor;
                this.motivo = motivo;
                this.created_at = created_at;
                this.updated_at = updated_at;
                this.quantidade = quantidade;
    }
}
