<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\TimelineController;
use App\Interacao;

class InteracaoController extends Controller
{
    public function getInteracoesFromPost($id){
        $interacoes = (object) $this->interacoesFromPost($id);
        return response()->json(['interacoes' => $interacoes, 'status' => 'OK', 'message' => 'Pegou interacoes'], 200);
    }
    
    public function interacoesFromPost($id){
        $likes = Interacao::where('post_idPost', $id)
                          ->where('alvo', 'post')
                          ->where('tipo_interacao', 'like')
                          ->get();

        $dislikes = Interacao::where('post_idPost', $id)
                            ->where('alvo', 'post')
                            ->where('tipo_interacao', 'dislike')
                            ->get();

        $shares = Interacao::where('post_idPost', $id)
                            ->where('alvo', 'post')
                            ->where('tipo_interacao', 'share')
                            ->groupBy('leitor_idLeitor')
                            ->get();
        
        $loves = Interacao::where('post_idPost', $id)
                            ->where('alvo', 'post')
                            ->where('status', 'A')//A - ativo // N - NÃO ativo
                            ->groupBy('leitor_idLeitor')
                            ->get();

        $sads = Interacao::where('post_idPost', $id)
                            ->where('alvo', 'post')
                            ->where('tipo_interacao', 'sad')
                            ->groupBy('leitor_idLeitor')
                            ->get();

        $angrys = Interacao::where('post_idPost', $id)
                            ->where('alvo', 'post')
                            ->where('tipo_interacao', 'angry')
                            ->groupBy('leitor_idLeitor')
                            ->get();

        $cries = Interacao::where('post_idPost', $id)
                            ->where('alvo', 'post')
                            ->where('tipo_interacao', 'cry')
                            ->groupBy('leitor_idLeitor')
                            ->get();

        $response = [
            'likes' => $likes,
            'dislikes' => $dislikes,
            'shares' => $shares,
            'love' => $loves,
            'sad' => $sads,
            'angry' => $angrys,
            'cry' => $cries
        ];

        return $response;
    }

    private function getInteracoesPostFromLeitor($post_id, $leitor_id){
        return Interacao::where('leitor_idLeitor')
                               ->where('post_idPost')
                               ->whereNull('comentario_idComentario')
                               ->where('tipo_interacao', '<>', 'share')
                               ->get();
    }

    public function getInteracoesPostLeitor($post_id, $leitos_id){
        
    }
    
    public function novo(Request $request){

        $interacao_atual = $this->getInteracoesPostFromLeitor($request->post_idPost, $request->leitor_idLeitor);
        
        //se o leitor interagiu tem alguma interação com esse post, deleta
        $interacoes_do_leitor = Interacao::where('status', 'A')
                                          ->where('leitor_idLeitor', $request->leitor_idLeitor)
                                          ->where('post_idPost', $request->post_idPost)
                                          ->where('comentario_idComentario', $request->comentario_idComentario)
                                          ->where('alvo', $request->alvo)
                                          ->where('tipo_interacao', '<>', 'share')
                                          ->delete();

        
        
        //cria/ativa a interação selecionada
        //ativa
        $interacao_inativa = Interacao::where('status', 'N')
                                            ->where('leitor_idLeitor', $request->leitor_idLeitor)
                                            ->where('post_idPost', $request->post_idPost)
                                            ->where('comentario_idComentario', $request->comentario_idComentario)
                                            ->where('alvo', $request->alvo)
                                            ->where('tipo_interacao', $request->tipo)
                                            ->get();

        if($interacao_inativa->count() > 0){
            $i = $interacao_inativa->first();
            $i->status = 'A';
            $i->save();
            if($i->tipo_interacao === 'share'){
                $tl_c = new TimelineController();
                $tl_c->create($i->leitor_idLeitor, $i->post_idPost);
            }
            return response()->json(['interacoes' => (object) $this->interacoesFromPost($i->post_idPost), 'status' => 'OK', 'message' => 'Ativou a interação'], 200);
        }
        //cria
        $interacao = null;
        $interacao = $this->createInteracao($request, $interacao);
        $interacao->save();

        if($interacao->tipo_interacao === 'share'){
            $tl_c = new TimelineController();
            $tl_c->create($interacao->leitor_idLeitor, $interacao->post_idPost);
        }

        return response()->json(['interacoes' => (object) $this->interacoesFromPost($interacao->post_idPost),
                                 'status' => 'OK', 
                                 'message' => 'Criou a Interação'], 200);
    }

    private function createInteracao(Request $request, $i){
        $i = new Interacao();

        $i->post_idPost = $request->post_idPost;
        $i->leitor_idLeitor = $request->leitor_idLeitor;
        $i->comentario_idComentario = $request->comentario_idComentario;
        $i->alvo = $request->alvo;
        $i->tipo_interacao = $request->tipo;
        $i->status = 'A';

        return $i;
    }
}
