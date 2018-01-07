<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\InteracaoLeitor;
use App\Http\Controllers\InteracaoController;

class InteracaoLeitorController extends Controller
{
    private function createInteracao(Request $request){
        $interacaoLeitor = new InteracaoLeitor();

        $interacaoLeitor->post_idPost = $request->post_idPost;
        $interacaoLeitor->comentario_idComentario = $request->comentario_idComentario;
        $interacaoLeitor->leitor_idLeitor = $request->leitor_idLeitor;
        $interacaoLeitor->interacao_idInteracao = $request->interacao_idInteracao;

        $interacaoLeitor->save();
    }

    private function interagePost(Request $request){
        $exist = null;
        
        if ($request->interacao_idInteracao != 100){
            //verifica se essa interação ja existe
            $interacaoLeitor = InteracaoLeitor::where('post_idPost', $request->post_idPost)
                                ->where('leitor_idLeitor', $request->leitor_idLeitor)
                                ->where('interacao_idInteracao', $request->interacao_idInteracao)
                                ->whereNull('comentario_idComentario')
                                ->first();

            if ($interacaoLeitor)
                $exist = true;
        
            InteracaoLeitor::where('post_idPost', $request->post_idPost)
                                ->where('leitor_idLeitor', $request->leitor_idLeitor)
                                ->whereNull('comentario_idComentario')
                                ->delete();
        }

        //se a interação não existia ou se é compartilhar, cria uma nova
        //se a interação já existia, quer dizer que ele ta desfazendo ela
        if (!$exist)
            $this->createInteracao($request);

        $c = new InteracaoController();
        $interacoesCount = $c->getInteracoes($request->post_idPost, 1);

        $interacoesLeitor = $this->getPost($request->post_idPost, $request->leitor_idLeitor);

        return response()->json(['interacoes' => $interacoesCount, 'interacoesLeitor' => $interacoesLeitor], 200);
    }

    private function interageComentario(Request $request){
        $exist = false;
        
        //verifica se essa interação ja existe
        $interacaoLeitor = InteracaoLeitor::where('comentario_idComentario', $request->post_idPost)
                            ->where('leitor_idLeitor', $request->leitor_idLeitor)
                            ->where('interacao_idInteracao', $request->interacao_idInteracao)
                            ->first();

        if ($interacaoLeitor)  {
            $exist = true;
            InteracaoLeitor::where('comentario_idComentario', $request->post_idPost)
                           ->where('leitor_idLeitor', $request->leitor_idLeitor)
                           ->delete();
        }
            
        //se a interação não existia, cria uma nova
        //se a interação já existia, quer dizer que ele ta desfazendo ela
        if ($exist == false)
            $this->createInteracao($request);

        return response()->json(['ok' => 'true'], 201);
    }

    private function getPost($post_id, $leitor_id){
        return InteracaoLeitor::where('post_idPost', $post_id)
                                           ->where('leitor_idLeitor', $leitor_id)
                                           ->whereNull('comentario_idComentario')
                                           ->get();
    }

    public function interage(Request $request){
        if ($request->comentario_idComentario)
            return $this->interageComentario($request);
        else 
            return $this->interagePost($request);
    }

    public function countInteracao($post_id, $interacao_id){
        return InteracaoLeitor::where('post_idPost', $post_id)
                                ->where('interacao_idInteracao', $interacao_id)
                                ->count();
    }

    public function getInteracoesLeitorPost($post_id, $leitor_id){
        $interacoesLeitor = $this->getPost($post_id, $leitor_id);

        return response()->json(['interacoesLeitor' => $interacoesLeitor], 200);
    }
}
