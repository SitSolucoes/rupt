import { Admin } from './../admin/admin';

export class Post {
    id: number;
    titulo: string;
    conteudo: string;
    //escritor: Escritor;
    admin_del: Admin;
    subtitulo: string;
    visualizacoes: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date

     /*constructor(id: number, titulo: string, admin: Admin, 
                 escritor: Escritor, conteudo: string,
                 subtitulo: string, visualizacoes: number, deleted_at: Date,
                 created_at: Date, updated_at: Date){
                this.id = id;
                this.titulo = titulo;
                this.admin_del = admin;
                this.escritor = escritor;
                this.conteudo = conteudo;
                this.subtitulo = subtitulo;
                this.visualizacoes = visualizacoes;
                this.created_at = created_at;
                this.updated_at = updated_at;
                this.deleted_at = deleted_at;
    }*/
}
