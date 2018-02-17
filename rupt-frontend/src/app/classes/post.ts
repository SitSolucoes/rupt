import { CategoriasPost } from "app/classes/categorias-post";
import { Leitor } from "app/classes/leitor";

export class Post {
    id: number;
    titulo: string;
    subtitulo: string;
    conteudo: string;
    conteudo_card: string;
    src_imagem: string;
    link: string;

    autor_idLeitor: number;
    idAdmin_deleted: number;
    visualizacoes: number;
    tipo_post: string;
    adulto: boolean;

    publishedAt: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    
    autor: Leitor;
    categorias_post: CategoriasPost[];
}
