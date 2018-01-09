import { Post } from './post';
import { Interacao } from 'app/classes/interacao';
import { InteracaoLeitor } from 'app/classes/interacao-leitor';

export class Timeline {
    id: number;
    post: Post;

    interacoes: Interacao[];
    interacoesLeitor: InteracaoLeitor[];
}
