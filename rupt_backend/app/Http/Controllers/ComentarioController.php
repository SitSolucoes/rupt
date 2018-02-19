<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comentario;
use App\Notificacao;
use App\Http\Controllers\NotificacaoController;
use App\Http\Controllers\PostController;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

class ComentarioController extends Controller
{
    
    public function create(Request $request){
        
        $comentario = new Comentario();
        $comentario = $this->createComentario($request, $comentario);
        $comentario->ativo = true;
        
        $comentario->save();

        if (!$comentario->comentario_idComentario || $comentario->comentario_idComentario == 0){
            $c = new PostController();
            $post = $c->getById($request->post_idPost);
            $post = $post->first();

            $notificacao = new Notificacao();
            $notificacao->escritor_idEscritor = $post->autor->id;
            $notificacao->leitor_idLeitor = $request->leitor_idLeitor;
            $notificacao->lida = false;
            $notificacao->tipo = 5;
            $notificacao->descricao = 'comentou a sua publicação';
            $notificacao->rota = '/noticia/'.$post->link;

            NotificacaoController::create($notificacao);
        }

        $comentarios = $this->comentariosFromPost($comentario->post_idPost);

        return response()->json(['comentarios' => $comentarios, 'status' => 'OK'], 200);
    }

    private function createComentario(Request $request, $c){
        $c->post_idPost = $request->post_idPost;
        $c->leitor_idLeitor = $request->leitor_idLeitor;
        $c->comentario = $request->comentario;
        $c->comentario_idComentario = $request->comentario_idComentario;

        return $c;
    }
    
    public function getComentariosFromPost($id){
        $comentarios = $this->comentariosFromPost($id);
        return response()->json(['comentarios' => $comentarios], 200);
    }

    public function comentariosFromPost($id){
        $comentarios = Comentario::where("post_idPost","=", $id)
                                 ->whereNull("comentario_idComentario")
                                 ->orderBy('created_at', 'desc')
                                 ->get();
        
        $response = [];
        //para cada comentario

        foreach($comentarios as $c){
            //pegar respostas
            $respostas = $this->getRespostas($c->id);
            $c = $this->montaComentario($c);
            $criado = new Carbon($c->created_at);
            $c->minutos = $criado->diffInMinutes(Carbon::now());
            //montar objeto {comentario, respostas} e inserir no array de resposta;
            $response[] = (object) [
                'comentario' => $c,
                'respostas' => $respostas
            ];
            //retornar
        }
        return $response;
    }

    public function montaComentario($comentario){
        //echo $comentario->leitor;
        $comentarios = (object) [
                'comentario' => $comentario->comentario,
                'leitor' => $comentario->leitor->nick ? $comentario->leitor->nick : $comentario->leitor->nome,
                'src_leitor' => $comentario->leitor->src_imagem,
                'data' => $comentario->created_at
        ];
        return $comentario;
    }

    private function getRespostas($id){
        $respostas = Comentario::where('comentario_idComentario', '=' ,$id)->get();
        return $respostas;
    }

    public static function countComentarios($post_id){
        return Comentario::where('post_idPost', $post_id)
                           ->where('ativo', 1)
                           ->count();
    }
}
