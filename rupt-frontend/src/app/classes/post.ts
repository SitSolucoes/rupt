import { CategoriasPost } from "app/classes/categorias-post";
import { Leitor } from "app/classes/leitor";

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
    adulto: boolean;

    autor: Leitor;
    categorias_post: CategoriasPost[];
}
