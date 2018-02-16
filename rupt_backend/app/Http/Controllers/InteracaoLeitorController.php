<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\InteracaoLeitor;
use App\Notificacao;
use App\Http\Controllers\NotificacaoController;
use App\Http\Controllers\InteracaoController;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\PostController;

class InteracaoLeitorController extends Controller
{
    private function createInteracao(Request $request, $tipoInteracao){
        $interacaoLeitor = new InteracaoLeitor();

        $interacaoLeitor->post_idPost = $request->post_idPost;
        $interacaoLeitor->comentario_idComentario = $request->comentario_idComentario;
        $interacaoLeitor->timeline_idTimeline = $request->timeline_idTimeline;
        $interacaoLeitor->leitor_idLeitor = $request->leitor_idLeitor;
        $interacaoLeitor->interacao_idInteracao = $request->interacao['id'];

        $interacaoLeitor->save();

        /*
        tipoInteracao: 
            1 - post
            2 - timeline
            3 - comentário
        tipo: 
            3 - reação
            4 - compartilhar 
        */

        $c = new PostController();
        $post = $c->getById($request->post_idPost);
        $post = $post->first();

        $notificacao = new Notificacao();
        $notificacao->escritor_idEscritor = $post->autor->id;
        $notificacao->leitor_idLeitor = $request->leitor_idLeitor;
        $notificacao->lida = false;

        switch ($tipoInteracao) {
            case 1:
                if ($request->interacao['compartilhar']){
                    $notificacao->tipo = 4;
                    $notificacao->descricao = 'compartilhou a sua publicação';
                }
                else{
                    $notificacao->tipo = 3;
                    $notificacao->descricao = 'reagiu a sua publicação';
                }

                $notificacao->rota = '/noticia/'.$post->link;
                break;
            case 2:
                $notificacao->descricao = 'reagiu a uma publicação';
                $notificacao->rota = '/noticia/'.$post->link;
                break;
            case 3:
                $notificacao->tipo = 3;
                $notificacao->descricao = 'reagiu ao seu comentário';
                $notificacao->rota = '/noticia/'.$post->link;    
                break;
        }

        NotificacaoController::create($notificacao);
    }

    private function interagePost(Request $request){
        $exist = null;

        if (!$request->interacao['compartilhar']){
            //verifica se essa interação ja existe
            $interacaoLeitor = InteracaoLeitor::where('post_idPost', $request->post_idPost)
                                ->where('leitor_idLeitor', $request->leitor_idLeitor)
                                ->where('interacao_idInteracao', $request->interacao['id'])
                                ->whereNull('comentario_idComentario')
                                ->whereNull('timeline_idTimeline')
                                ->first();

            if ($interacaoLeitor)
                $exist = true;
        
            InteracaoLeitor::where('post_idPost', $request->post_idPost)
                                ->where('leitor_idLeitor', $request->leitor_idLeitor)
                                ->whereNull('comentario_idComentario')
                                ->whereNull('timeline_idTimeline')
                                ->delete();
        }
        else if (!$request->interacao['externa']){
            $c = new TimelineController();
            $c->create($request->leitor_idLeitor, $request->post_idPost);
        }
        
        //se a interação não existia ou se é compartilhar, cria uma nova
        //se a interação já existia, quer dizer que ele ta desfazendo ela
        if (!$exist)
            $this->createInteracao($request, 1);

        $c = new InteracaoController();
        $interacoesCount = $c->getInteracoes($request->post_idPost, 1, false);

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
            $this->createInteracao($request, 3);

        return response()->json(['ok' => 'true'], 201);
    }

    private function interageTimeline(Request $request){
        $exist = null;
        
        if (!$request->interacao['compartilhar']){
            //verifica se essa interação ja existe
            $interacaoLeitor = InteracaoLeitor::where('timeline_idTimeline', $request->timeline_idTimeline)
                                ->where('leitor_idLeitor', $request->leitor_idLeitor)
                                ->where('interacao_idInteracao', $request->interacao['id'])
                                ->first();

            if ($interacaoLeitor)
                $exist = true;
        
            InteracaoLeitor::where('timeline_idTimeline', $request->timeline_idTimeline)
                                ->where('leitor_idLeitor', $request->leitor_idLeitor)
                                ->whereNull('comentario_idComentario')
                                ->delete();
        }
        else{
            $c = new TimelineController();
            $c->create($request->leitor_idLeitor, $request->post_idPost);
        }
        
        //se a interação não existia ou se é compartilhar, cria uma nova
        //se a interação já existia, quer dizer que ele ta desfazendo ela
        if (!$exist)
            $this->createInteracao($request, 2);

        $c = new InteracaoController();
        $interacoesCount = $c->getInteracoes($request->timeline_idTimeline, 1, true);

        $interacoesLeitor = $this->getTimeline($request->timeline_idTimeline, $request->leitor_idLeitor);

        return response()->json(['interacoes' => $interacoesCount, 'interacoesLeitor' => $interacoesLeitor], 200);
    }

    public function getPost($post_id, $leitor_id){
        return InteracaoLeitor::where('post_idPost', $post_id)
                              ->where('leitor_idLeitor', $leitor_id)
                              ->whereNull('comentario_idComentario')
                              ->whereNull('timeline_idTimeline')
                              ->with('interacao')
                              ->get();
    }

    public function getTimeline($timeline_id, $leitor_id){
        return InteracaoLeitor::where('timeline_idTimeline', $timeline_id)
                              ->where('leitor_idLeitor', $leitor_id)
                              ->with('interacao')
                              ->get();
    }

    public function interage(Request $request){
        if ($request->comentario_idComentario)
            return $this->interageComentario($request);
        else if ($request->timeline_idTimeline)
            return $this->interageTimeline($request);
        else 
            return $this->interagePost($request);
    }

    public function countInteracao($post_id, $interacao_id){
        return InteracaoLeitor::where('post_idPost', $post_id)
                                ->where('interacao_idInteracao', $interacao_id)
                                ->whereNull('comentario_idComentario')
                                ->whereNull('timeline_idTimeline')
                                ->count();
    }

    public function countInteracaoTimeline($timeline_id, $interacao_id){
        return InteracaoLeitor::where('timeline_idTimeline', $timeline_id)
                                ->where('interacao_idInteracao', $interacao_id)
                                ->count();
    }

    public function getInteracoesLeitorPost($post_id, $leitor_id){
        $interacoesLeitor = $this->getPost($post_id, $leitor_id);

        return response()->json(['interacoesLeitor' => $interacoesLeitor], 200);
    }

    public function desfazCompartilhamento(Request $request){
        InteracaoLeitor::where('interacao_idInteracao', $request->interacao['id'])
                       ->where('leitor_idLeitor', $request->leitor_idLeitor)
                       ->where('post_idPost', $request->post_idPost)
                       ->delete();
        
        $tc = new TimelineController();
        $id = $tc->getIdTimeline($request->post_idPost, $request->leitor_idLeitor);
        $tc->delete($id);

        $c = new InteracaoController();
        $interacoesCount = $c->getInteracoes($request->post_idPost, 1, false);

        $interacoesLeitor = $this->getPost($request->post_idPost, $request->leitor_idLeitor);

        return response()->json(['interacoes' => $interacoesCount, 'interacoesLeitor' => $interacoesLeitor], 200);
    }

    public static function sumPeso($post_id){
        $interacoes = InteracaoLeitor::where('post_idPost', $post_id)
                                    ->whereNull('comentario_idComentario')
                                    ->whereNull('timeline_idTimeline')
                                    ->with('interacao')
                                    ->get();

        $sum = 0;

        foreach( $interacoes as $interacao ){
            $sum += $interacao->interacao->peso;
        }

        return $sum;
    }
}
