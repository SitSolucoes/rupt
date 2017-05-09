import { Escritor } from './escritor';

export class Post {
    id: number;
    titulo: string;
    conteudo: string;
    escritor: Escritor;
    created_at: Date;
    updated_at: Date;
}
