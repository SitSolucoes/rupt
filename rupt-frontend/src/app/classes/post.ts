export class Post {
    id: number;
    titulo: string;
    conteudo: string;
    autor_idLeitor
    //escritor: Escritor;
    idAdmin_deleted: number;
    src_imagem: string;
    visualizacoes: number;
    publishedAt: Date;
    subtitulo: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    tipo_post: string;

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
